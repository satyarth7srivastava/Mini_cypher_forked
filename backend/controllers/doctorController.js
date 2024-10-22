const Doctor = require('../models/doctor');

exports.registerDoctor = async (req, res) => {
  const { name, specialization, licenseNumber } = req.body;
  const doctorAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199"; 

  try {
    // Register doctor on the blockchain
    const tx = await req.contract.registerDoctor(name, specialization, licenseNumber);
    const receipt = await tx.wait();

    // Extract the doctor ID from the event
    const doctorId = receipt.events[0].args.doctorId;

    // Save doctor details to MongoDB
    const newDoctor = new Doctor({
      name,
      specialization,
      licenseNumber,
      address: doctorAddress,
      doctorId: doctorId.toNumber(),
    });
    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully', doctorId: doctorId.toNumber() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
