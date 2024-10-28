/*
const PatientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true, 
  },
  photo: {
    type: String, 
    required: true,
  }
});

const healthDataSchema = new mongoose.Schema({
  patientId: Number,
  timestamp: Number,
  dataHash: String,
  dataType: String,
  addedBy: String,  // Ethereum address of the doctor or patient
  isAcceptedByPatient: Boolean,
});

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  address: { type: String, required: true }, // Ethereum address
  doctorId: { type: Number, required: true, unique: true }, // On-chain doctor ID
});

const appointmentSchema = new mongoose.Schema({
  patientId: Number,
  doctorId: Number,
  date: Number,
  isModifiedByDoctor: Boolean,
  isAcceptedByPatient: Boolean,
  appointmentHash: String,
});

*/

const samplePatients = [
    {
        patientId: "P001",
        address: "0x123456789abcdef",
        name: "John Doe",
        age: 30,
        photo: "photo1.jpg"
    },
    {
        patientId: "P002",
        address: "0xabcdef123456789",
        name: "Jane Smith",
        age: 25,
        photo: "photo2.jpg"
    }
];

const sampleHealthData = [
    {
        patientId: 1,
        timestamp: 1622547800,
        dataHash: "hash1",
        dataType: "Blood Test",
        addedBy: "0xdoctor1",
        isAcceptedByPatient: true
    },
    {
        patientId: 2,
        timestamp: 1622634200,
        dataHash: "hash2",
        dataType: "X-Ray",
        addedBy: "0xdoctor2",
        isAcceptedByPatient: false
    }
];

const sampleDoctors = [
    {
        name: "Dr. Alice",
        specialization: "Cardiology",
        licenseNumber: "LIC123",
        address: "0xdoctor1",
        doctorId: 1
    },
    {
        name: "Dr. Bob",
        specialization: "Neurology",
        licenseNumber: "LIC456",
        address: "0xdoctor2",
        doctorId: 2
    }
];

const sampleAppointments = [
    {
        patientId: 1,
        doctorId: 1,
        date: 1622720600,
        isModifiedByDoctor: false,
        isAcceptedByPatient: true,
        appointmentHash: "appointment1"
    },
    {
        patientId: 2,
        doctorId: 2,
        date: 1622807000,
        isModifiedByDoctor: true,
        isAcceptedByPatient: false,
        appointmentHash: "appointment2"
    }
];

module.exports = {
    samplePatients,
    sampleHealthData,
    sampleDoctors,
    sampleAppointments
};