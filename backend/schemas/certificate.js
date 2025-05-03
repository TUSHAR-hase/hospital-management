// Certificate Schema (create in models/certificate.js)
import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  filename: String,
  patient:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Patient", 
          required: true,
      },
  contentType: String,
  data: Buffer,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export const Certificate = mongoose.model('Certificate', certificateSchema);