const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const db = require('./src/config/db');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const menuRoutes = require('./src/routes/menuRoutes');
const aiRoutes = require('./src/routes/aiRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Smart Bake Hub API is running...');
});

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        await db.ready;
    } catch (error) {
        console.warn('Database connection failed. Starting server in degraded mode.');
        console.warn(error && error.message ? error.message : error);
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})();
