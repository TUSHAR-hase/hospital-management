import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const patientSchema = new mongoose.Schema({
  role: { type: String, required: true, enum: ['patient', 'doctor', 'receptionist'], default: 'patient' },
  
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  image: { type: String, required: true }, // Profile picture URL or path

  contact: {
    phone: { type: String },
    address: { type: String }
  },
  otp: {
    type: Number,
},
isVerifiedOtp: {
    type: Boolean,
    default: false
},
  // Extra fields for patients

}, { timestamps: true });

// Hash password before saving
patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Patient = mongoose.models.Patient || mongoose.model('Patient', patientSchema);
export default Patient;
