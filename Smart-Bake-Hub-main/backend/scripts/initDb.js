const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

async function initDb() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            port: dbPort,
            multipleStatements: true
        });

        const schema = fs.readFileSync(path.join(__dirname, '../../database/schema.sql'), 'utf8');
        
        console.log('Executing schema...');
        await connection.query(schema);
        console.log('Database initialized successfully.');
        
        await connection.end();
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

initDb();
