import mongoose from "mongoose";
 const contactMessageSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // reference to User model
    required: false, // optional in case it's from a guest
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits'],
  },
  subject: {
    type: String,
    enum: ['General Inquiry', 'Doctor Appointment', 'Medical Certificate', 'Ambulance Service'],
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

 const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
 export default ContactMessage
