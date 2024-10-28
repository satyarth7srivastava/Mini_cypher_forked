// routes/doctorRoutes.js
const express = require('express');
const { registerDoctor } = require('../controllers/doctorController'); // Import your controller
const router = express.Router();

// Route to save doctor data
router.post('/register', registerDoctor); // Link the route to the controller function

module.exports = router;
