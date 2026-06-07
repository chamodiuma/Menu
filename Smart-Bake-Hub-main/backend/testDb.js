const pool = require('./src/config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

async function test() {
    try {
        console.log('Testing MySQL connection...');
        // try a simple query
        const [rows] = await pool.query('SELECT 1 AS ok');
        console.log('Query result:', rows);

        // check current database
        const [dbRows] = await pool.query('SELECT DATABASE() as db');
        console.log('Connected to database:', dbRows[0].db);

        // get server version
        const [vRows] = await pool.query('SELECT VERSION() as version');
        console.log('MySQL server version:', vRows[0].version);

        console.log('✔ MySQL connection test succeeded.');
    } catch (err) {
        console.error('❌ MySQL connection test failed:', err && err.message ? err.message : err);
        if (err && err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('Access denied: check DB_USER and DB_PASS in backend/.env');
        } else if (err && (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND')) {
            console.error('Connection refused: is MySQL running and reachable on the configured host/port?');
        } else if (err && err.fatal) {
            console.error('Fatal MySQL error:', err);
        }
    } finally {
        try { await pool.end(); } catch(e){}
        process.exit(0);
    }
}

test();
