import express from "express";
import Appointment from "../schemas/appoinment.js";
import Doctor from "../schemas/doctorschema.js";
import Patient from "../schemas/patient.js";
const router = express.Router();

export const postappoinment=async (req, res) => {
    try {
        const { patientId, doctorId, date, timeSlot, symptoms, paymentMethod, paymentAmount } = req.body;

      
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ message: "Doctor not found" });

        
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ message: "Patient not found" });

        const newAppointment = new Appointment({
            patient: patientId,
            doctor: doctorId,
            date,
            timeSlot,
            symptoms,
            payment: {
                status: "Pending",
                method: paymentMethod,
                amount: "200",
            },
        });

        await newAppointment.save();
        // console.log(newAppointment)
        res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getappoinment= async (req, res) => {
    try {
        const appointments = await Appointment.find()
            .populate("patient", "name email")
            .populate("doctor", "name specialization")
            .sort({ date: 1 });
        res.status(200).json(appointments);
        console.log(appointments)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const getbyid= async (req, res) => {
    try {
        const {id}=req.params
        // console.log(`userid ${userid}`)
        const appointment = await Appointment.find({patient:id})
            .populate("patient", "name email")
            .populate("doctor", "name specialization");
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getbydoctorid= async (req, res) => {
    try {
        const id=req.params.id
        console.log(id)
        // console.log(`userid ${userid}`)
        const appointment = await Appointment.find({doctor:id})
            .populate("patient")
            .populate("doctor", "name specialization");
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const update = async (req, res) => {
    try {
        console.log("Received Params:", req.params);
        
        // console.log("Received Params:", req.params);
        const { id } = req.params;  // ID should come from URL params
        const { status } = req.params;
        if (!status) {
            return res.status(400).json({ message: "Status is required." });
        }

       

        const updatedAppointment = await Appointment.findByIdAndUpdate(id,
            { status: status },  
            { new: true } 
        );

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment: updatedAppointment,
        });
    } catch (error) {
        console.error("❌ Error updating appointment status:", error); 
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Appointment not found" });

        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const updateCertificateUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const { certificateUrl } = req.body;

        // Find and update appointment
        const appointment = await Appointment.findByIdAndUpdate(id, 
            { "certificate.url": certificateUrl },
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        res.json({ message: "Certificate URL updated successfully", appointment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updaterequest=async (req, res) => {
    try {
        // const { id } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, 
            { "certificate.requested": true }, // Updating only the certificate.requested field
             { new: true })

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (appointment.certificate.requested) {
            return res.status(400).json({ message: "Certificate request already sent" });
        }

        appointment.certificate.requested = true;
        await appointment.save();

        res.json({ message: "Certificate request sent successfully", appointment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

export const updateapprove = async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                "certificate.approved": true,
                "certificate.url": req.body.url
            },
            { new: true } // Returns updated document
        );

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        if (!appointment.certificate.requested) {
            return res.status(400).json({ message: "No certificate request found" });
        }

        res.json({ message: "Certificate approved and available for download", appointment });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export default router;