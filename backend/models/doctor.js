const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  doctorId: { type: Number, required: true }, 
  doctorAddress: { type: String, required: true },
  doctorName: { type: String, required: true },
  specialization: { type: String, required: true },
  licenseNumber: { type: String, required: true }, 
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;