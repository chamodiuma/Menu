const pool = require('../config/db');

// @desc    Get all menus
const getMenus = async (req, res) => {
    try {
        const { keyword, category } = req.query;
        let query = `SELECT m.*, c.name as category_name, COUNT(mp.product_id) as product_count
                     FROM menus m 
                     LEFT JOIN categories c ON m.category_id = c.id
                     LEFT JOIN menu_products mp ON m.id = mp.menu_id
                     WHERE 1=1`;
        let queryParams = [];

        if (keyword) {
            query += ' AND (m.name LIKE ? OR m.description LIKE ?)';
            queryParams.push(`%${keyword}%`, `%${keyword}%`);
        }

        if (category) {
            query += ' AND c.name = ?';
            queryParams.push(category);
        }

        query += ' GROUP BY m.id ORDER BY m.created_at DESC';

        const [menus] = await pool.query(query, queryParams);
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single menu with products
const getMenuById = async (req, res) => {
    try {
        const [menus] = await pool.query(
            `SELECT m.*, c.name as category_name 
             FROM menus m 
             LEFT JOIN categories c ON m.category_id = c.id 
             WHERE m.id = ?`,
            [req.params.id]
        );
        
        if (menus.length === 0) {
            return res.status(404).json({ message: 'Menu not found' });
        }

        const menu = menus[0];

        // Get products in this menu
        const [products] = await pool.query(
            `SELECT p.*, mp.quantity 
             FROM products p
             INNER JOIN menu_products mp ON p.id = mp.product_id
             WHERE mp.menu_id = ?`,
            [req.params.id]
        );

        menu.products = products;
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a menu
const createMenu = async (req, res) => {
    const { name, description, category_id, price, status = 'active', productItems = [] } = req.body;

    try {
        // Insert menu
        const [result] = await pool.query(
            'INSERT INTO menus (category_id, name, description, price, status) VALUES (?, ?, ?, ?, ?)',
            [category_id || null, name, description, price, status]
        );

        const menuId = result.insertId;

        // Insert menu products with quantities
        if (productItems && productItems.length > 0) {
            for (const item of productItems) {
                const productId = item.product_id || item.id;
                const qty = item.quantity ? parseInt(item.quantity, 10) : 1;
                await pool.query(
                    'INSERT INTO menu_products (menu_id, product_id, quantity) VALUES (?, ?, ?)',
                    [menuId, productId, qty]
                );
            }
        }

        res.status(201).json({ id: menuId, message: 'Menu created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a menu
const updateMenu = async (req, res) => {
    const { name, description, category_id, price, status, productItems = [] } = req.body;
    const { id } = req.params;

    try {
        // Update menu
        await pool.query(
            'UPDATE menus SET name=?, description=?, category_id=?, price=?, status=? WHERE id=?',
            [name, description, category_id || null, price, status || 'active', id]
        );

        // Remove old product associations
        await pool.query('DELETE FROM menu_products WHERE menu_id = ?', [id]);

        // Add new product associations with quantities
        if (productItems && productItems.length > 0) {
            for (const item of productItems) {
                const productId = item.product_id || item.id;
                const qty = item.quantity ? parseInt(item.quantity, 10) : 1;
                await pool.query(
                    'INSERT INTO menu_products (menu_id, product_id, quantity) VALUES (?, ?, ?)',
                    [id, productId, qty]
                );
            }
        }

        res.json({ message: 'Menu updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a menu
const deleteMenu = async (req, res) => {
    try {
        // Delete menu products first (cascade should handle this, but explicit delete is safer)
        await pool.query('DELETE FROM menu_products WHERE menu_id = ?', [req.params.id]);
        
        // Delete menu
        await pool.query('DELETE FROM menus WHERE id = ?', [req.params.id]);
        res.json({ message: 'Menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
};
