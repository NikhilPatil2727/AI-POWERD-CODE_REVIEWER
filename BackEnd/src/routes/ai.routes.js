const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller'); // Fixed spelling mistake

router.post('/get-review', aiController.getReview); // Fixed variable reference

module.exports = router;
