const express = require('express');
const Doctor = require('../models/Doctor'); 
const router = express.Router();

// Route to save doctor data
router.post('/register', async (req, res) => {
  const { doctorAddress, doctorName, specialization } = req.body;

  try {
    const newDoctor = new Doctor({ doctorAddress, doctorName, specialization });
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving doctor: ' + error.message });
  }
});

module.exports = router;
