import React, { useState } from 'react';
import { ethers } from 'ethers';
import ABI from "../ABI.json";
import axios from 'axios'; 

const contractABI = ABI;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function HealthData() {
  const [patientId, setPatientId] = useState(0);
  const [dataHash, setDataHash] = useState('');
  const [healthData, setHealthData] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Blockchain transaction
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await contract.addHealthData(patientId, dataHash, healthData);
      await tx.wait();

      // MongoDB data saving
      // await axios.post('/healthdata', {
      //   patientAddress,
      //   healthData,
      // });

      setStatus('Health data added successfully!');
    } catch (error) {
      setStatus('Error adding health data.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add Health Data</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Patient Id"
          required
        />
        <input
          type="text"
          value={healthData}
          onChange={(e) => setHealthData(e.target.value)}
          placeholder="Health Data"
          required
        />
        <input
          type="text"
          value={dataHash}
          onChange={(e) => setDataHash(e.target.value)}
          placeholder="Health Data Hash"
          required
        />
        <button type="submit">Add Data</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default HealthData;
