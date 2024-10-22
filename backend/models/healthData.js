const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  patientId: Number,
  timestamp: Number,
  dataHash: String,
  dataType: String,
  addedBy: String,  // Ethereum address of the doctor or patient
  isAcceptedByPatient: Boolean,
});

module.exports = mongoose.model('HealthData', healthDataSchema);
