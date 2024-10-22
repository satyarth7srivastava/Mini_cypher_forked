const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


describe("DPHRS Contract", function () {
  let DPHRS, dphrs, owner, patient, doctor;

  beforeEach(async function () {
    [owner, patient, doctor] = await ethers.getSigners();

 
    DPHRS = await ethers.getContractFactory("DPHRS");
    dphrs = await DPHRS.deploy();
    await dphrs.waitForDeployment();
  });

  it("should register a patient successfully", async function () {
    await dphrs.connect(patient).registerPatient("aman", 13, "photoURL");
    const patientId = await dphrs.addressToPatientId(patient.address);

    const patientDetails = await dphrs.patientDetails(patientId);
    expect(patientDetails.name).to.equal("aman");
    expect(patientDetails.age).to.equal(13);
    expect(patientDetails.photo).to.equal("photoURL");
    expect(patientDetails.isRegistered).to.be.true;
  });

  it("should register a doctor successfully", async function () {
    await dphrs.connect(doctor).registerDoctor("ankur", "Cardiologist", "12345");
    const doctorId = await dphrs.addressToDoctorId(doctor.address);

    const doctorDetails = await dphrs.doctorDetails(doctorId);
    expect(doctorDetails.name).to.equal("ankur");
    expect(doctorDetails.specialization).to.equal("Cardiologist");
    expect(doctorDetails.licenseNumber).to.equal("12345");
    expect(doctorDetails.isRegistered).to.be.true;
  });

  it("should allow a doctor to add health data for a patient", async function () {
    // Register the patient and doctor
    await dphrs.connect(patient).registerPatient("aman", 13, "photoURL");
    const patientId = await dphrs.addressToPatientId(patient.address);

    await dphrs.connect(doctor).registerDoctor("ankur", "Cardiologist", "12345");

    // Doctor adds health data
    await dphrs.connect(doctor).addHealthData(patientId, "hash123", "Blood Test");

    const healthData = await dphrs.patientData(patientId, 0);
    expect(healthData.dataHash).to.equal("hash123");
    expect(healthData.dataType).to.equal("Blood Test");
    expect(healthData.isAcceptedByPatient).to.be.false;
    expect(healthData.addedBy).to.equal(doctor.address);
  });

  it("should allow the patient to accept health data added by the doctor", async function () {
    // Register patient and doctor
    await dphrs.connect(patient).registerPatient("aman", 30, "photoURL");
    const patientId = await dphrs.addressToPatientId(patient.address);

    await dphrs.connect(doctor).registerDoctor("ankur", "Cardiologist", "12345");

    // Doctor adds health data
    await dphrs.connect(doctor).addHealthData(patientId, "hash123", "Blood Test");

    // Patient accepts the health data
    await dphrs.connect(patient).acceptHealthData(patientId, 0);

    const healthData = await dphrs.patientData(patientId, 0);
    expect(healthData.isAcceptedByPatient).to.be.true;
  });

  it("should allow a doctor to modify health data and patient must accept it again", async function () {
    // Register patient and doctor
    await dphrs.connect(patient).registerPatient("aman", 30, "photoURL");
    const patientId = await dphrs.addressToPatientId(patient.address);

    await dphrs.connect(doctor).registerDoctor("ankur", "Cardiologist", "12345");

    // Doctor adds health data
    await dphrs.connect(doctor).addHealthData(patientId, "hash123", "Blood Test");

    // Patient accepts the health data
    await dphrs.connect(patient).acceptHealthData(patientId, 0);
    let healthData = await dphrs.patientData(patientId, 0);
    expect(healthData.isAcceptedByPatient).to.be.true;

    // Doctor modifies the health data
    await dphrs.connect(doctor).modifyHealthData(patientId, 0, "newHash456");

    // After modification, the patient should have to accept it again
    healthData = await dphrs.patientData(patientId, 0);
    expect(healthData.dataHash).to.equal("newHash456");
    expect(healthData.isAcceptedByPatient).to.be.false;

    // Patient accepts the modified health data
    await dphrs.connect(patient).acceptHealthData(patientId, 0);

    healthData = await dphrs.patientData(patientId, 0);
    expect(healthData.isAcceptedByPatient).to.be.true;
  });

  it("should create an appointment and allow the doctor to modify it", async function () {
    // Register patient and doctor
    await dphrs.connect(patient).registerPatient("aman", 30, "photoURL");
    const patientId = await dphrs.addressToPatientId(patient.address);

    await dphrs.connect(doctor).registerDoctor("ankur", "Cardiologist", "12345");
    const doctorId = await dphrs.addressToDoctorId(doctor.address);

    // Create an appointment
    await dphrs.connect(doctor).createAppointment(patientId, doctorId, 1698000000, "appointmentHash123");

    const appointment = await dphrs.appointments(patientId, 0);
    expect(appointment.appointmentHash).to.equal("appointmentHash123");
    expect(appointment.isModifiedByDoctor).to.be.false;
    expect(appointment.isAcceptedByPatient).to.be.false;

    // Doctor modifies the appointment
    await dphrs.connect(doctor).modifyAppointment(patientId, 0, "newAppointmentHash456");

    const modifiedAppointment = await dphrs.appointments(patientId, 0);
    expect(modifiedAppointment.appointmentHash).to.equal("newAppointmentHash456");
    expect(modifiedAppointment.isModifiedByDoctor).to.be.true;

    // Patient accepts the appointment modification
    await dphrs.connect(patient).acceptAppointmentModification(patientId, 0);
    const acceptedAppointment = await dphrs.appointments(patientId, 0);
    expect(acceptedAppointment.isAcceptedByPatient).to.be.true;
  });
});
