const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

async function createAdmin() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'smart_bake_hub',
        port: dbPort
    });

    try {
        const email = 'admin@smartbakehub.com';
        const password = 'password123';
        
        const [userExists] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (userExists.length > 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await pool.query('UPDATE users SET password = ?, role = "admin" WHERE email = ?', [hashedPassword, email]);
            console.log('Reset password for admin@smartbakehub.com to "password123"');
            process.exit(0);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            ['Admin User', email, hashedPassword, 'admin']
        );

        console.log('Created admin user successfully.');
        console.log('Email: admin@smartbakehub.com');
        console.log('Password: password123');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

createAdmin();
