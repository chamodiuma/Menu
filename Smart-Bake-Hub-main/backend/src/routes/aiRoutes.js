const express = require('express');
const router = express.Router();
const { generateForecast } = require('../controllers/aiController');

// In a real app, you would add auth middleware here (e.g., protect)
router.get('/forecast', generateForecast);

module.exports = router;
