// src/App.js
import React from 'react';
import PatientRegistration from './components/PatientRegistration';
import DoctorRegistration from './components/DoctorRegistration';
import BookAppointment from './components/BookAppointment';
import HealthData from './components/HealthData';

function App() {
  return (
    <div className="App">
      <h1>Healthcare DApp</h1>
      <PatientRegistration />
      <DoctorRegistration />
      <BookAppointment />
      <HealthData />
    </div>
  );
}

export default App;
