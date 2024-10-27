const express = require('express');
const connectDB = require('./config/db'); 
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const healthDataRoutes = require('./routes/healthDataRoutes'); 
require('dotenv').config(); 

const app = express();

app.use(express.json()); 

// Connect to MongoDB
connectDB();

// API Routes
app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/healthdata', healthDataRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
