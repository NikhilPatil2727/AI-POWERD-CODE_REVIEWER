const aiService = require('../services/ai.service');

module.exports.getReview = async (req, res) => {
    const { code } = req.body; // Extract 'code' from request body

    if (!code) {
        return res.status(400).send("Code is required");
    }

    try {
        const response = await aiService(code);
        res.send(response);
    } catch (error) {
        res.status(500).send("Internal server error");
    }
};
