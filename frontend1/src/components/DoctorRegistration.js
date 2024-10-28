// src/components/DoctorRegistration.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import ABI from "../ABI.json";
import axios from 'axios';




function DoctorRegistration() {
  const [doctorAddress, setDoctorAddress] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Register doctor on Blockchain and save to MongoDB via backend
      const response = await axios.post('http://localhost:5000/doctors/register', {
        doctorAddress,
        doctorName,
        specialization
      });

      if (response.status === 201) {
        setStatus('Doctor registered successfully and saved to MongoDB!');
      } else {
        setStatus('Error saving doctor to MongoDB.');
      }
    } catch (error) {
      console.error(error.response.data); 
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
