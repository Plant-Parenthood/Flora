const client = require('../lib/client');

run();

async function run() {

    // !!!
    // STILL TO DO: DROP TABLES SPECIFIC FOR THE PLANT APP! DELETE THIS LINE ONCE PLANT APP SPECIFIC DROP TABLES HAVE BEEN MADE!!!
    // !!!
    
    try {
        // run a query to create tables
        await client.query(`
            DROP TABLE IF EXISTS favorites;
            DROP TABLE IF EXISTS hikes;
            DROP TABLE IF EXISTS users;
        `);

        console.log('drop tables complete');
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