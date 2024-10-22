const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  address: { type: String, required: true }, // Ethereum address
  doctorId: { type: Number, required: true, unique: true }, // On-chain doctor ID
});

module.exports = mongoose.model('Doctor', doctorSchema);
