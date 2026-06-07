const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mysql = require('mysql2/promise');

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

async function seed() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'smart_bake_hub',
        port: dbPort
    });

    try {
        await pool.query('INSERT INTO products (name, description, price, category_id, image_url, discount_percentage) VALUES (?, ?, ?, ?, ?, ?)', [
            'Signature Chocolate Truffle',
            'Rich dark chocolate cake layered with silky ganache.',
            1500,
            null,
            null,
            20
        ]);

        await pool.query('INSERT INTO products (name, description, price, category_id, image_url, discount_percentage) VALUES (?, ?, ?, ?, ?, ?)', [
            'Butterscotch Caramel Pastry',
            'Fluffy butterscotch sponge soaked in caramel.',
            450,
            null,
            null,
            15
        ]);
        
        await pool.query('INSERT INTO products (name, description, price, category_id, image_url, discount_percentage) VALUES (?, ?, ?, ?, ?, ?)', [
            'Strawberry Glaze Donut',
            'Freshly baked donut with strawberry glaze.',
            300,
            null,
            null,
            10
        ]);

        await pool.query('INSERT INTO products (name, description, price, category_id, image_url, discount_percentage) VALUES (?, ?, ?, ?, ?, ?)', [
            'Vanilla Bean Cupcake',
            'Classic cupcake topped with vanilla bean frosting.',
            250,
            null,
            null,
            25
        ]);

        console.log('Seeded discounted products.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seed();
