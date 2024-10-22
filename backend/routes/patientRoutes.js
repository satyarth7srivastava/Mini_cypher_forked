const express = require('express');
const Patient = require('../models/Patient'); // Assuming you have a Patient model
const router = express.Router();

// Route to save patient data
router.post('/register', async (req, res) => {
  const { patientAddress, patientName } = req.body;

  try {
    const newPatient = new Patient({ patientAddress, patientName });
    await newPatient.save();
    res.status(201).json({ message: 'Patient saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving patient: ' + error.message });
  }
});

module.exports = router;
