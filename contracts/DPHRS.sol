// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract DPHRS {
    struct PatientDetails {
        string name;
        uint256 age;
        string photo;
        bool isRegistered;
    }

    struct DoctorDetails {
        string name;
        string specialization;
        string licenseNumber;
        bool isRegistered;
    }

    struct Appointment {
        uint256 patientId;
        uint256 doctorId;
        uint256 date;
        bool isModifiedByDoctor;
        bool isAcceptedByPatient;
        string appointmentHash; // Hash of data stored in MongoDB
    }

    struct HealthData {
        uint256 timestamp;
        string dataHash;  
        string dataType;  
        address addedBy;  
        bool isAcceptedByPatient; 
    }

    // Store appointments on-chain
    mapping(uint256 => Appointment[]) public appointments;

    // Mappings for storing data
    mapping(uint256 => PatientDetails) public patientDetails;
    mapping(uint256 => DoctorDetails) public doctorDetails;
    mapping(address => uint256) public addressToPatientId;
    mapping(address => uint256) public addressToDoctorId;
    mapping(uint256 => HealthData[]) public patientData;

    event HealthDataAdded(uint256 patientId, uint256 timestamp, string dataType, string newDataHash, address addedBy);
    event HealthDataAccepted(uint256 patientId, uint256 dataIndex);
    event AppointmentModified(uint256 appointmentId, string newHash);
    event PatientRegistered(uint256 patientId, string name, uint256 age);
    event DoctorRegistered(uint256 doctorId, string name, string specialization);
    event AppointmentCreated(uint256 patientId, uint256 doctorId, uint256 date, string appointmentHash);
    event ModificationAccepted(uint256 patientId, uint256 appointmentId);

    // Modifier to allow only doctors to modify health data
    modifier onlyDoctor() {
        require(addressToDoctorId[msg.sender] != 0, "Not a registered doctor");
        _;
    }

    uint256 nextPatientId = 1;
    uint256 nextDoctorId = 1;

    // Function to register a patient
    function registerPatient(string memory _name, uint256 _age, string memory _photo) public {
        uint256 patientId = nextPatientId++;
        patientDetails[patientId] = PatientDetails(_name, _age, _photo, true);
        addressToPatientId[msg.sender] = patientId;
        emit PatientRegistered(patientId, _name, _age);
    }

    // Function to register a doctor
    function registerDoctor(string memory _name, string memory _specialization, string memory _licenseNumber) public {
        uint256 doctorId = nextDoctorId++;
        doctorDetails[doctorId] = DoctorDetails(_name, _specialization, _licenseNumber, true);
        addressToDoctorId[msg.sender] = doctorId;
        emit DoctorRegistered(doctorId, _name, _specialization);
    }

    // Function to create an appointment
    function createAppointment(uint256 _patientId, uint256 _doctorId, uint256 _date, string memory _appointmentHash) public {
        Appointment memory newAppointment = Appointment(_patientId, _doctorId, _date, false, false, _appointmentHash);
        appointments[_patientId].push(newAppointment);
        emit AppointmentCreated(_patientId, _doctorId, _date, _appointmentHash);
    }

    // Function to modify the appointment (for doctor)
    function modifyAppointment(uint256 _patientId, uint256 _appointmentId, string memory _newHash) public {
        Appointment storage appointment = appointments[_patientId][_appointmentId];
        require(appointment.doctorId == addressToDoctorId[msg.sender], "Not authorized");
        appointment.appointmentHash = _newHash;
        appointment.isModifiedByDoctor = true;
        emit AppointmentModified(_appointmentId, _newHash);
    }

    // Function for a doctor to add new health data for a patient
    function addHealthData(uint256 _patientId, string memory _dataHash, string memory _dataType) public onlyDoctor {
        require(patientDetails[_patientId].isRegistered, "Patient not registered");
        
        HealthData memory newData = HealthData({
            timestamp: block.timestamp,
            dataHash: _dataHash,
            dataType: _dataType,
            addedBy: msg.sender,
            isAcceptedByPatient: false
        });

        patientData[_patientId].push(newData);
        emit HealthDataAdded(_patientId, block.timestamp, _dataType, _dataHash, msg.sender);
    }

    // Function for a patient to accept health data added by a doctor
    function acceptHealthData(uint256 _patientId, uint256 _dataIndex) public {
        require(addressToPatientId[msg.sender] == _patientId, "Not authorized");
        require(_dataIndex < patientData[_patientId].length, "Invalid data index");
        
        HealthData storage data = patientData[_patientId][_dataIndex];
        require(!data.isAcceptedByPatient, "Data already accepted");

        data.isAcceptedByPatient = true;
        emit HealthDataAccepted(_patientId, _dataIndex);
    }

    // Function to modify patient's health data by a doctor
    function modifyHealthData(uint256 _patientId, uint256 _dataIndex, string memory _newDataHash) public onlyDoctor {
        require(_dataIndex < patientData[_patientId].length, "Invalid data index");

        HealthData storage data = patientData[_patientId][_dataIndex];
        data.dataHash = _newDataHash;
        data.timestamp = block.timestamp;
        data.addedBy = msg.sender;
        data.isAcceptedByPatient = false;  

        emit HealthDataAdded(_patientId, block.timestamp, data.dataType, _newDataHash, msg.sender);
    }

    // Function for patient to accept the doctor's appointment modification
    function acceptAppointmentModification(uint256 _patientId, uint256 _appointmentId) public {
        require(addressToPatientId[msg.sender] == _patientId, "Not authorized");
        Appointment storage appointment = appointments[_patientId][_appointmentId];
        require(appointment.isModifiedByDoctor, "No modification to accept");
        appointment.isAcceptedByPatient = true;
        emit ModificationAccepted(_patientId, _appointmentId);
    }
}
