const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'smart_bake_hub',
        port: dbPort,
});

const generateSales = async () => {
    try {
        console.log("Fixing categories...");
        // Ensure products have categories
        await pool.query(`UPDATE products SET category_id = 4 WHERE name LIKE '%Cake%' OR name LIKE '%Truffle%'`);
        await pool.query(`UPDATE products SET category_id = 1 WHERE name LIKE '%Pastry%' OR name LIKE '%Donut%' OR name LIKE '%Croissant%'`);
        await pool.query(`UPDATE products SET category_id = 3 WHERE name LIKE '%Coffee%' OR name LIKE '%Tea%'`);
        await pool.query(`UPDATE products SET category_id = 2 WHERE name LIKE '%Sandwich%' OR name LIKE '%Burger%' OR name LIKE '%Pasta%'`);
        // Any remaining get category 1
        await pool.query(`UPDATE products SET category_id = 1 WHERE category_id IS NULL`);

        // Fetch products
        const [products] = await pool.query('SELECT id, price, category_id FROM products');
        if (products.length === 0) {
            console.log("No products found! Please seed products first.");
            process.exit(1);
        }

        console.log(`Found ${products.length} products. Generating 30 days of sales...`);
        
        // Delete old orders
        await pool.query('DELETE FROM order_items');
        await pool.query('DELETE FROM orders');

        const NUM_DAYS = 30;
        const now = new Date();
        
        for (let i = NUM_DAYS; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            // Randomize number of orders per day (more on weekends)
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            const numOrders = isWeekend ? Math.floor(Math.random() * 40) + 30 : Math.floor(Math.random() * 20) + 15;
            
            for (let j = 0; j < numOrders; j++) {
                // Random time during the day (8am to 8pm)
                const orderTime = new Date(date);
                orderTime.setHours(8 + Math.floor(Math.random() * 12));
                orderTime.setMinutes(Math.floor(Math.random() * 60));

                const [orderResult] = await pool.query(
                    'INSERT INTO orders (total_amount, status, created_at, updated_at) VALUES (?, ?, ?, ?)',
                    [0, 'completed', orderTime, orderTime]
                );
                const orderId = orderResult.insertId;

                const numItems = Math.floor(Math.random() * 4) + 1; // 1-4 items per order
                let totalAmount = 0;

                for (let k = 0; k < numItems; k++) {
                    const product = products[Math.floor(Math.random() * products.length)];
                    const quantity = Math.floor(Math.random() * 3) + 1;
                    const price = Number(product.price);
                    
                    await pool.query(
                        'INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES (?, ?, ?, ?, ?)',
                        [orderId, product.id, quantity, price, orderTime]
                    );
                    
                    totalAmount += (price * quantity);
                }

                // Update total
                await pool.query('UPDATE orders SET total_amount = ? WHERE id = ?', [totalAmount, orderId]);
            }
        }
        
        console.log("Successfully generated sales data.");
        process.exit(0);
    } catch (err) {
        console.error("Error generating sales:", err);
        process.exit(1);
    }
};

generateSales();
