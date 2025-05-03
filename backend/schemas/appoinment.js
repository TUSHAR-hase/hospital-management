import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient", 
        required: true,
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor", 
        required: true,
    },
    date: {
        type: Date,
        required: true,
    
    },
    timeSlot: {
        type: String, 
        required: true,
    },
    symptoms: {
        type: String,
        trim: true,
        maxlength: 500, 
    },
    
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
        default: "Pending",
    },
    payment: {
        status: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },
        method: {
            type: String,
            enum: ["Cash", "Card", "Online"],
            default: "Online",
        },
        amount: {
            type: Number,
            required: true,
        }
    },
    certificate: {
        requested: {
            type: Boolean,
            default: false, // Patient ne request kiya ya nahi
        },
        approved: {
            type: Boolean,
            default: false, // Doctor ne approve kiya ya nahi
        },
        url: {
            type: String, // Certificate ka download URL
            default: null,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// export default Appointment=mongoose.models.Appointment|| mongoose.model("Appointment", appointmentSchema);
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
 export default Appointment