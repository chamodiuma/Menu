const express = require('express');
const router = express.Router();
const { 
    getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories, createCategory 
} = require('../controllers/productController');
const { protect, admin, staff } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Categories
router.route('/categories')
    .get(getCategories)
    .post(protect, admin, createCategory);

// Products
router.route('/')
    .get(protect, getProducts)
    .post(protect, staff, upload.single('image'), createProduct);

router.route('/:id')
    .get(protect, getProductById)
    .put(protect, staff, upload.single('image'), updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;
