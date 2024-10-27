const Patient = require('../models/Patient');

exports.registerPatient = async (req, res) => {
  const { name, age, photo } = req.body;
  const patientAddress = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71"; 

  try {
    // Register patient on the blockchain
    const tx = await req.contract.registerPatient(name, age, photo);
    const receipt = await tx.wait();

    // Extract the patient ID from the event
    const patientId = receipt.events[0].args.patientId;

    // Save patient details to MongoDB
    const newPatient = new Patient({
      name,
      age,
      photo,
      address: patientAddress,
      patientId: patientId.toNumber(), 
    });
    await newPatient.save();

    res.status(201).json({ message: 'Patient registered successfully', patientId: patientId.toNumber() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
