const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, name, email, role, status, created_at FROM users');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await pool.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
        res.json({ message: 'User status updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    try {
        await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
        res.json({ message: 'User role updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getUsers, updateUserStatus, updateUserRole };
