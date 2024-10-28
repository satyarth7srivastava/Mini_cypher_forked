// controllers/doctorController.js
const Doctor = require('../models/doctor');
const { ethers } = require('ethers');
const ABI = require('./ABI.json'); // Import your contract ABI
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Initialize your Ethereum provider
const provider = new ethers.JsonRpcProvider("http://localhost:8545"); 

exports.registerDoctor = async (req, res) => {
    const { doctorAddress, doctorName, specialization } = req.body;

    try {
        // Interact with the smart contract to register the doctor on-chain
        const signer = provider.getSigner(); // Get the signer from the provider
        const contract = new ethers.Contract(contractAddress, ABI, signer); // Connect the contract to the signer
 
        const tx = await contract.registerDoctor(doctorName, specialization); // Call the contract function
        await tx.wait(); // Wait for the transaction to be mined


        // Create a new Doctor instance for off-chain storage
        const newDoctor = new Doctor({
            doctorAddress : await signer.getAddress(),
            doctorName,
            specialization,
            isRegistered: true 
        });

        // Save the doctor to the MongoDB database
        await newDoctor.save();
        res.status(201).json({ message: 'Doctor registered successfully on-chain and off-chain!' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering doctor: ' + error.message });
    }
};
