// src/components/DoctorRegistration.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ABI from "../ABI.json";
import axios from 'axios'; // For API calls to backend

const contractABI = ABI;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function DoctorRegistration() {
  const [doctorAddress, setDoctorAddress] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //  Save doctor data to MongoDB
      const response = await axios.post('http://localhost:5000/doctors/register', {
        doctorAddress,
        doctorName,
        specialization
      });

      if (response.status === 201) {
        // Register doctor on Blockchain
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.registerDoctor(doctorAddress, doctorName, specialization);
        await tx.wait();

        setStatus('Doctor registered successfully and saved to MongoDB!');
      } else {
        setStatus('Error saving doctor to MongoDB.');
      }
    } catch (error) {
      setStatus('Error registering doctor.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register Doctor</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={doctorAddress}
          onChange={(e) => setDoctorAddress(e.target.value)}
          placeholder="Doctor Address"
          required
        />
        <input
          type="text"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          placeholder="Doctor Name"
          required
        />
        <input
          type="text"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          placeholder="Specialization"
          required
        />
        <button type="submit">Register Doctor</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default DoctorRegistration;
