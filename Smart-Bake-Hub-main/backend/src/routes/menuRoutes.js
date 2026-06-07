const express = require('express');
const router = express.Router();
const { 
    getMenus, getMenuById, createMenu, updateMenu, deleteMenu 
} = require('../controllers/menuController');
const { protect, staff, admin } = require('../middleware/authMiddleware');

// Menus
router.route('/')
    .get(protect, getMenus)
    .post(protect, staff, createMenu);

router.route('/:id')
    .get(protect, getMenuById)
    .put(protect, staff, updateMenu)
    .delete(protect, admin, deleteMenu);

module.exports = router;
