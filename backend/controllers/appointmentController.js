const Appointment = require('../models/Appointment');

// Controller to handle creating a new appointment
exports.createAppointment = async (req, res) => {
    const { patientId, doctorId, date, appointmentHash } = req.body;

    try {
        // Create and save the new appointment in MongoDB
        const newAppointment = new Appointment({
            patientId,
            doctorId,
            date,
            appointmentHash
        });

        await newAppointment.save();
        res.status(201).json({ message: 'Appointment saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving appointment', error: error.message });
    }
};

// Controller to get appointments for a patient
exports.getAppointmentsByPatientId = async (req, res) => {
    const { patientId } = req.params;

    try {
        // Fetch all appointments for a given patient ID
        const appointments = await Appointment.find({ patientId });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this patient' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// Controller to get appointments for a doctor
exports.getAppointmentsByDoctorId = async (req, res) => {
    const { doctorId } = req.params;

    try {
        // Fetch all appointments for a given doctor ID
        const appointments = await Appointment.find({ doctorId });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this doctor' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// Controller to update an appointment
exports.updateAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { appointmentHash, isModifiedByDoctor, isAcceptedByPatient } = req.body;

    try {
        // Find and update the appointment based on appointmentId
        const appointment = await Appointment.findById(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Update appointment details
        appointment.appointmentHash = appointmentHash || appointment.appointmentHash;
        appointment.isModifiedByDoctor = isModifiedByDoctor !== undefined ? isModifiedByDoctor : appointment.isModifiedByDoctor;
        appointment.isAcceptedByPatient = isAcceptedByPatient !== undefined ? isAcceptedByPatient : appointment.isAcceptedByPatient;

        await appointment.save();
        res.status(200).json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        res.status(500).json({ message: 'Error updating appointment', error: error.message });
    }
};
