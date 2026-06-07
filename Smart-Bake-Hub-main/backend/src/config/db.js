const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const configuredPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : null;
const DEFAULT_PORTS = [...new Set([configuredPort, 3306, 33060, 3307, 3308].filter(Boolean))];

const configBase = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'smart_bake_hub'
};

// Internal pool reference that can be rotated when we detect correct port/db
let internalPool = mysql.createPool({
    host: configBase.host,
    user: configBase.user,
    password: configBase.password,
    database: configBase.database,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Proxy object exported to other modules. Methods delegate to internalPool which
// we replace if we auto-detect a better port / configuration.
const pool = {
    query: (...args) => internalPool.query(...args),
    execute: (...args) => internalPool.execute(...args),
    getConnection: (...args) => internalPool.getConnection(...args),
    end: (...args) => internalPool.end(...args)
};

async function tryConnectAndEnsureDB(port) {
    const attemptConfig = {
        host: configBase.host,
        user: configBase.user,
        password: configBase.password,
        port,
        multipleStatements: true
    };

    let connection;
    try {
        connection = await mysql.createConnection(attemptConfig);
        await connection.query('SELECT 1');

        // Verify database exists; create it if missing
        const [rows] = await connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?', [configBase.database]);
        if (!rows || rows.length === 0) {
            console.log(`Database "${configBase.database}" not found on port ${port}. Creating database...`);
            await connection.query(`CREATE DATABASE IF NOT EXISTS \`${configBase.database}\``);
            console.log(`Database "${configBase.database}" created.`);
        }

        await connection.end();

        // Create a new pool bound to the detected port and database
        internalPool = mysql.createPool({
            host: configBase.host,
            user: configBase.user,
            password: configBase.password,
            database: configBase.database,
            port,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        console.log(`MySQL connection established on ${configBase.host}:${port} (DB: ${configBase.database}).`);
        return true;
    } catch (err) {
        if (connection) try { await connection.end(); } catch(e){}

        // Handle common errors with informative messages
        if (err && err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('MySQL Access Denied: please verify DB_USER and DB_PASS in your .env file.');
        } else if (err && (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND')) {
            console.error(`Connection refused on ${configBase.host}:${port} - MySQL may not be running on this port.`);
        } else {
            console.error(`MySQL connection attempt failed on port ${port}:`, err.message || err);
        }
        return false;
    }
}

const ready = (async () => {
    // Try candidate ports in order
    for (const port of DEFAULT_PORTS) {
        try {
            const ok = await tryConnectAndEnsureDB(port);
            if (ok) return;
        } catch (e) {
            // swallow and continue to next port
        }
    }

    // If we reach here, none of the ports worked
    console.error('\nUnable to connect to MySQL using the tried ports:', DEFAULT_PORTS.join(', '));
    console.error('Suggestions:');
    console.error('- Ensure MySQL server is running.');
    console.error('- Verify credentials in backend/.env (DB_HOST, DB_USER, DB_PASS, DB_NAME, optional DB_PORT).');
    console.error('- If you use MySQL Workbench, check the connection details (host & port).');
    console.error('- To allow passworded access for root use: ALTER USER \'root\'@\'localhost\' IDENTIFIED BY \'your_password\'; and FLUSH PRIVILEGES;');
    console.error('- If using a socket file or non-TCP connection, adjust configuration accordingly.');

    throw new Error(`Unable to connect to MySQL using ports: ${DEFAULT_PORTS.join(', ')}`);
})();

module.exports = pool;
module.exports.ready = ready;
