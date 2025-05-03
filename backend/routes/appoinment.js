import express from 'express';
import { postappoinment,update,getbydoctorid,deleteAppointment,getappoinment,getbyid,updateapprove,updaterequest,updateCertificateUrl} from '../api/appoinment.js';
import multer from "multer"
import path from "path"
import fs from "fs"
const router= express.Router();
router.get("/getappoinmentbyid/:id",getbyid)
router.get("/getappoinmentbydoctorid/:id",getbydoctorid)
router.put("/put/:id/:status",update)
router.put("/updateapprove/:id",updateapprove)
router.put("/updaterequest/:id",updaterequest)
router.put("/updateurl/:id",updateCertificateUrl)


// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "..", "uploads");

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });
export const  uploadCertificate = upload.single("certificate");

router.post("/upload-certificate", uploadCertificate, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const certificateUrl = `/uploads/${req.file.filename}`;
        res.status(200).json({ certificateUrl });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Certificate upload failed", error });
    }
});


router.post("/postappoinment",postappoinment)
router.delete("/deleteappoinment",deleteAppointment)
export default router;