import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import routeauth from './routes/auth.js';
import doctorroute from './routes/doctor.js';
import user from './routes/user.js';
import Receptionroute from './routes/receptions.js';
import ContactMessage from './routes/contectmessage.js';
import Reviewauth from './routes/review.js';
import appoinment from "./routes/appoinment.js";
import { Certificate } from './schemas/certificate.js';
dotenv.config();
const corseconfig = { origin: "*" ,
methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
credentials: true
};
const app = express();
const port = process.env.PORT || 3000;
app.options('*', corseconfig);
mongoose.set("strictQuery", false);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { 
      useNewUrlParser: true,
      useUnifiedTopology: true 
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

// Memory storage for PDF files
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors(corseconfig));
app.use(cookieParser());
app.use(express.json());

// Existing routes
app.use("/api/v1/auth", routeauth);
app.use("/api/v1/contectmessage", ContactMessage);
app.use("/api/v1/doctors", doctorroute);
app.use("/api/v1/users", user);
app.use("/api/v1/appoinment", appoinment);
app.use("/api/v1/reception", Receptionroute);
app.use("/api/v1/review", Reviewauth);


app.post('/api/v1/upload-certificate/:id', upload.single('certificate'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    
    const newCertificate = new Certificate({
      filename: req.file.originalname,
      patient:req.params.id,
      contentType: req.file.mimetype,
      data: req.file.buffer 
    });

    await newCertificate.save();

    res.status(200).json({
      message: 'PDF uploaded successfully',
      id: newCertificate._id,
      url: `/api/v1/certificate/${newCertificate._id}`
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Certificate upload failed', error });
  }
});

// PDF Download Endpoint
app.get('/api/v1/certificate/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    res.set('Content-Type', certificate.contentType);
    res.send(certificate.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving certificate' });
  }
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

