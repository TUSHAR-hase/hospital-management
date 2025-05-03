import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const receptionistSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  image: { type: String, required: true }, // Profile picture URL or path

  contact: {
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },

  shiftDetails: {
    workingDays: { type: [String], required: true }, // ['Monday', 'Tuesday', 'Wednesday']
    shiftTime: { type: String, required: true } // e.g., '9:00 AM - 5:00 PM'
  },
  otp: {
    type: Number,
},
isVerifiedOtp: {
    type: Boolean,
    default: false
},
  isApproved: { type: Boolean, default: false }, // Admin approval status
  role: { type: String, default: 'receptionist' }
}, { timestamps: true });

// Hash password before saving
receptionistSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const Receptionist = mongoose.models.Receptionist || mongoose.model('Receptionist', receptionistSchema);
export default Receptionist;
