import React, { useState } from 'react';
import { ethers } from 'ethers';
import ABI from "../ABI.json";
import axios from 'axios'; 

const contractABI = ABI;
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function BookAppointment() {
  const [doctorId, setDoctorId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [appointmentHash, setAppointmentHash] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Blockchain transaction
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      // there is some issue with the type please fix it
      //const DateToBigInt = BigInt(Date.parse(date));
      const tx = await contract.createAppointment(patientId, doctorId, Date, appointmentHash); 

      await tx.wait();

      // MongoDB data saving
      // await axios.post('/appointments', {
      //   doctorAddress,
      //   patientAddress,
      //   date,
      // });

      setStatus('Appointment booked successfully!');
    } catch (error) {
      setStatus('Error booking appointment.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          placeholder="Doctor ID"
          required
        />
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Patient Id"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          value={appointmentHash}
          onChange={(e) => setAppointmentHash(e.target.value)}
          placeholder="appointmentHash"
          required
        />
        <button type="submit">Book Appointment</button>
        
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default BookAppointment;
