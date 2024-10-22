const express = require('express');
const HealthData = require('../models/HealthData'); // Assuming you have a HealthData model
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { patientAddress, healthData } = req.body;

        // Save the health data in MongoDB
        const newHealthData = new HealthData({
            patientAddress,
            healthData,
        });
        await newHealthData.save();

        res.json({ message: 'Health data saved to MongoDB' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving health data' });
    }
});

module.exports = router;
