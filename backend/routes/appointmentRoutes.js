const express = require('express');
const Appointment = require('../models/Appointment'); // Assuming you have an Appointment model
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { doctorAddress, patientAddress, date } = req.body;

        // Save appointment data to MongoDB
        const newAppointment = new Appointment({
            doctorAddress,
            patientAddress,
            date
        });
        await newAppointment.save();

        res.json({ message: 'Appointment saved to MongoDB' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving appointment' });
    }
});

module.exports = router;
