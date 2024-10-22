const HealthData = require('../models/healthData');

exports.addHealthData = async (req, res) => {
  const { patientId, dataHash, dataType } = req.body;

  try {
    const tx = await req.contract.addHealthData(patientId, dataHash, dataType);
    await tx.wait();

    // Save to MongoDB
    const newHealthData = new HealthData({
      patientId,
      timestamp: Date.now(),
      dataHash,
      dataType,
      addedBy: req.contract.signer.address,
      isAcceptedByPatient: false,
    });
    await newHealthData.save();

    res.status(201).json({ message: 'Health data added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
