import React, { useState } from 'react';
// import axios from 'axios';
import { ethers } from 'ethers';
import ABI from "../ABI.json";

const contractABI = ABI;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function PatientRegistration() {
  const [patientId, setPatientId] = useState('');
  const [patientAddress, setPatientAddress] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log("Patient ID: ", patientId); remoeved as it is not used
      // Blockchain transaction
      const provider = new ethers.BrowserProvider(window.ethereum);
      // It will prompt user for account connections if it isnt connected
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.registerPatient(name, age, photo); // wrong function parameters fixed
      await tx.wait();

      // Save to MongoDB
      /*
      await axios.post('/patients', {
        patientId,
        address: patientAddress,
        name,
        age,
        photo,
      });
      */

      setStatus('Patient registered successfully!');
    } catch (error) {
      setStatus('Error registering patient.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Register Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Patient ID"
          required
        />
        <input
          type="text"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          placeholder="Patient Address"
          required
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Patient Name"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo URL"
          required
        />
        <button type="submit">Register Patient</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default PatientRegistration;
