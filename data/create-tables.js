const client = require('../lib/client');

run();

async function run() {

    // !!!
    // STILL TO DO: CREATE TABLES SPECIFIC FOR THE PLANT APP! DELETE THIS LINE ONCE PLANT APP SPECIFIC TABLES HAVE BEEN MADE!!!
    // !!!

    try {
        // run a query to create tables
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL,
                display_name VARCHAR(256) NOT NULL
            );
        
            CREATE TABLE saved_hikes (
                id SERIAL PRIMARY KEY,
                hike_obj VARCHAR(4000) NOT NULL,
                campgrounds_arr VARCHAR(255),
                rei_hike_id INTEGER NOT NULL UNIQUE REFERENCES favorites(hike_id)
            );

            CREATE TABLE campgrounds (
                id SERIAL PRIMARY KEY,
                campground_obj VARCHAR(4000) NOT NULL
            );
            
            CREATE TABLE favorites (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL REFERENCES users(id),
                hike_id INTEGER NOT NULL
            );

            
        `);

        console.log('create tables complete');
    }
    catch (err) {
        // problem? let's see the error...
        console.log(err);
    }
    finally {
        // success or failure, need to close the db connection
        client.end();
    }
    
}