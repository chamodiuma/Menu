const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mysql = require('mysql2/promise');

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

async function seedProducts() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'smart_bake_hub',
        port: dbPort,
        multipleStatements: true
    });

    try {
        console.log('Seeding products...');
        
        const seedQuery = `
            -- Get category IDs
            SET @cakes_id = (SELECT id FROM categories WHERE name = 'Cakes' LIMIT 1);
            SET @bakery_id = (SELECT id FROM categories WHERE name = 'Bakery Products' LIMIT 1);
            SET @meals_id = (SELECT id FROM categories WHERE name = 'Meals' LIMIT 1);
            SET @beverages_id = (SELECT id FROM categories WHERE name = 'Beverages' LIMIT 1);

            -- Insert sample products
            INSERT IGNORE INTO products (category_id, name, description, price, image_url, availability, discount_percentage)
            VALUES
            (@cakes_id, 'Chocolate Cake', 'Rich chocolate cake with ganache topping', 1200.00, '/uploads/chocolate-cake.jpg', 'available', 0),
            (@cakes_id, 'Vanilla Cupcake', 'Classic vanilla cupcake with buttercream', 250.00, '/uploads/vanilla-cupcake.jpg', 'available', 10),
            (@bakery_id, 'Butter Croissant', 'Flaky French butter croissant', 180.00, '/uploads/butter-croissant.jpg', 'available', 0),
            (@bakery_id, 'Sourdough Bread', 'Artisan sourdough with crispy crust', 350.00, '/uploads/sourdough-bread.jpg', 'available', 0),
            (@bakery_id, 'Whole Wheat Bread', 'Nutritious whole wheat bread', 280.00, '/uploads/whole-wheat-bread.jpg', 'available', 5),
            (@cakes_id, 'Strawberry Tart', 'Fresh strawberry tart with custard filling', 450.00, '/uploads/strawberry-tart.jpg', 'available', 0),
            (@bakery_id, 'Croissant Pack (6)', 'Pack of 6 fresh croissants', 900.00, '/uploads/croissant-pack.jpg', 'available', 15),
            (@cakes_id, 'Red Velvet Cake', 'Elegant red velvet cake with cream cheese frosting', 1500.00, '/uploads/red-velvet-cake.jpg', 'available', 0),
            (@meals_id, 'Chicken Sandwich', 'Grilled chicken sandwich with fresh vegetables', 350.00, '/uploads/chicken-sandwich.jpg', 'available', 0),
            (@meals_id, 'Egg & Cheese Breakfast', 'Fresh egg and cheese breakfast plate', 280.00, '/uploads/egg-cheese-breakfast.jpg', 'available', 10),
            (@beverages_id, 'Iced Coffee', 'Cold brew coffee with ice', 250.00, '/uploads/iced-coffee.jpg', 'available', 0),
            (@beverages_id, 'Hot Chocolate', 'Creamy hot chocolate', 200.00, '/uploads/hot-chocolate.jpg', 'available', 5),
            (@cakes_id, 'Carrot Cake', 'Moist carrot cake with cream cheese frosting', 1100.00, '/uploads/carrot-cake.jpg', 'out_of_stock', 0),
            (@meals_id, 'Veg Pasta', 'Fresh vegetable pasta with light sauce', 320.00, '/uploads/veg-pasta.jpg', 'available', 0),
            (@bakery_id, 'Chocolate Donut', 'Soft chocolate donut with glaze', 120.00, '/uploads/chocolate-donut.jpg', 'available', 20);
        `;

        const connection = await pool.getConnection();
        await connection.query(seedQuery);
        // Seed demo menus and their product associations
        const seedMenus = `
            -- Create demo menus if they don't exist and link products
            INSERT INTO menus (category_id, name, description, price, status)
            SELECT (SELECT id FROM categories WHERE name='Meals' LIMIT 1), 'Breakfast Combo', 'Egg & Cheese breakfast with a drink', 499.00, 'active'
            FROM DUAL
            WHERE NOT EXISTS (SELECT 1 FROM menus WHERE name='Breakfast Combo');

            INSERT INTO menus (category_id, name, description, price, status)
            SELECT (SELECT id FROM categories WHERE name='Bakery Products' LIMIT 1), 'Bakery Pack', 'Assorted bakery pack with 6 croissants and donuts', 950.00, 'active'
            FROM DUAL
            WHERE NOT EXISTS (SELECT 1 FROM menus WHERE name='Bakery Pack');

            INSERT INTO menus (category_id, name, description, price, status)
            SELECT (SELECT id FROM categories WHERE name='Cakes' LIMIT 1), 'Party Cake Set', 'Combo of popular cakes for parties', 3500.00, 'active'
            FROM DUAL
            WHERE NOT EXISTS (SELECT 1 FROM menus WHERE name='Party Cake Set');

            -- Link products to menus (if not already linked)
            INSERT INTO menu_products (menu_id, product_id, quantity)
            SELECT m.id, p.id, 1
            FROM menus m
            JOIN products p ON p.name = 'Egg & Cheese Breakfast'
            WHERE m.name = 'Breakfast Combo' AND NOT EXISTS (
                SELECT 1 FROM menu_products mp WHERE mp.menu_id = m.id AND mp.product_id = p.id
            );

            INSERT INTO menu_products (menu_id, product_id, quantity)
            SELECT m.id, p.id, 1
            FROM menus m
            JOIN products p ON p.name = 'Iced Coffee'
            WHERE m.name = 'Breakfast Combo' AND NOT EXISTS (
                SELECT 1 FROM menu_products mp WHERE mp.menu_id = m.id AND mp.product_id = p.id
            );

            INSERT INTO menu_products (menu_id, product_id, quantity)
            SELECT m.id, p.id, 1
            FROM menus m
            JOIN products p ON p.name = 'Croissant Pack (6)'
            WHERE m.name = 'Bakery Pack' AND NOT EXISTS (
                SELECT 1 FROM menu_products mp WHERE mp.menu_id = m.id AND mp.product_id = p.id
            );

            INSERT INTO menu_products (menu_id, product_id, quantity)
            SELECT m.id, p.id, 1
            FROM menus m
            JOIN products p ON p.name = 'Chocolate Donut'
            WHERE m.name = 'Bakery Pack' AND NOT EXISTS (
                SELECT 1 FROM menu_products mp WHERE mp.menu_id = m.id AND mp.product_id = p.id
            );

            INSERT INTO menu_products (menu_id, product_id, quantity)
            SELECT m.id, p.id, 1
            FROM menus m
            JOIN products p ON p.name = 'Chocolate Cake'
            WHERE m.name = 'Party Cake Set' AND NOT EXISTS (
                SELECT 1 FROM menu_products mp WHERE mp.menu_id = m.id AND mp.product_id = p.id
            );

            INSERT INTO menu_products (menu_id, product_id, quantity)
            SELECT m.id, p.id, 1
            FROM menus m
            JOIN products p ON p.name = 'Vanilla Cupcake'
            WHERE m.name = 'Party Cake Set' AND NOT EXISTS (
                SELECT 1 FROM menu_products mp WHERE mp.menu_id = m.id AND mp.product_id = p.id
            );

            INSERT INTO menu_products (menu_id, product_id, quantity)
            SELECT m.id, p.id, 1
            FROM menus m
            JOIN products p ON p.name = 'Red Velvet Cake'
            WHERE m.name = 'Party Cake Set' AND NOT EXISTS (
                SELECT 1 FROM menu_products mp WHERE mp.menu_id = m.id AND mp.product_id = p.id
            );
        `;

        const conn2 = await pool.getConnection();
        await conn2.query(seedMenus);
        conn2.release();
        connection.release();

        console.log('✓ Sample products seeded successfully');
        process.exit(0);
    } catch (e) {
        console.error('Error seeding products:', e.message);
        process.exit(1);
    }
}

seedProducts();
