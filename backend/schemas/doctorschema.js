import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  image: { type: String, required: true }, // Profile picture URL or path
  otp: {
    type: Number,
},
isVerifiedOtp: {
    type: Boolean,
    default: false
},
  specialization: { type: String, required: true }, // e.g., Cardiologist, Dermatologist
  experience: { type: Number, required: true }, // Years of experience
  qualifications: { type: [String], required: true }, // Array of degrees/certifications

  bio: { type: String, required: true }, // Short description about the doctor

  contact: {
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },

  availability: {
    days: { type: [String], required: true }, // ['Monday', 'Wednesday', 'Friday']
    timeSlots: { type: [String], required: true } // ['10:00 AM - 12:00 PM', '3:00 PM - 5:00 PM']
  },

  avgRating: { type: Number, default: 0 }, // Average rating (calculated from reviews)
  isApproved: { type: Boolean, default: false }, // Admin approval status

  reviews: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      name: { type: String, required: true }, // Reviewer's name
      rating: { type: Number, required: true, min: 1, max: 5 }, // Rating (1-5)
      comment: { type: String, required: true }, // Review comment
      createdAt: { type: Date, default: Date.now }
    }
  ],

  role: { type: String, default: 'doctor' }
}, { timestamps: true });

// Hash password before saving
doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

 const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
 export default Doctor
