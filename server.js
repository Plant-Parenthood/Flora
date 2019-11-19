// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// Database Client
const client = require('./lib/client');
// Services
const hikesApi = require('./lib/rei-hike-api-call.js');
console.log(hikesApi);

// Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');

const authRoutes = createAuthRoutes({
    async selectUser(email) {
        const result = await client.query(`
            SELECT id, email, hash, display_name as "displayName" 
            FROM users
            WHERE email = $1;
        `, [email]);
        return result.rows[0];
    },
    async insertUser(user, hash) {
        console.log(user);
        const result = await client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `, [user.email, hash, user.displayName]);
        return result.rows[0];
    }
});

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data

// setup authentication routes
app.use('/api/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// *** API Routes ***
app.get('/api/hikes', async(req, res) => {

    try {
        const query = req.query;

        const hikes = await hikesApi.get(query.search, query.page);

        const ids = hikes.map(hike => hike.id);

        const result = await client.query(`
            SELECT id 
            FROM favorites
            WHERE user_id = $1
            AND id = ANY($2)
        `, [req.userId, ids]);

        const lookup = result.rows.reduce((acc, hike) => {
            acc[hike.id] = true;
            return acc;
        }, {});

        hikes.forEach(hike => hike.isFavorite = lookup[hike.id] || false);

        res.json(hikes);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

//
//we might have to add this back in - TRUE as "isFavorite"

app.get('/api/favorites', async(req, res) => {
    try {
        const result = await client.query(`
            SELECT  id, 
                    user_id as "userId",
                    hike_id as "hikeId",
                    TRUE as "isFavorite"
            FROM favorites
            WHERE user_id = $1;
        `, [req.userId]);

        res.json(result.rows);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

//add a hike to your faves
app.post('/api/favorites', async(req, res) => {
    try {
        const hike = req.body;

        const result = await client.query(`
            INSERT INTO favorites (hike_id, user_id)
            VALUES ($1, $2)
            RETURNING hike as hike_id, user_id as "userId";
        `, [hike.id, req.userId]);

        res.json(result.rows[0]);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.delete('api/favorites/:id', (req, res) => {
    try {
        client.query(`
            DELETE FROM favorites
            WHERE id = $1
            AND user_id = $2;
        `, [req.params.id, req.userId]);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

//Start up server
app.listen(PORT, () => {
    console.log('serving running on PORT', PORT);
});