const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: Number,
  doctorId: Number,
  date: Number,
  isModifiedByDoctor: Boolean,
  isAcceptedByPatient: Boolean,
  appointmentHash: String,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
