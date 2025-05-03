import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema for user registration
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'receptionist'],
    default: 'patient'
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  image: {
    type: String,  // Store the image path or URL (in case you save the image on a server)
    required: true
  },
  otp: {
    type: Number,
},
isVerifiedOtp: {
    type: Boolean,
    default: false
},
}, { timestamps: true });

// Create the model
const User = mongoose.models.User||mongoose.model('User', userSchema);
export default User;

