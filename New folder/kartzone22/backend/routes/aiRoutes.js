const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const auth = require('../middleware/auth'); // I'll create this middleware next

router.post('/assistant', aiController.getAssistantResponse);
router.post('/mood-shop', aiController.getMoodRecommendations);
router.get('/product-insights/:id', aiController.getProductAIInsights);

module.exports = router;
