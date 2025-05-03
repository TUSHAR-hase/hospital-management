import ContactMessage from "../schemas/contectmessage.js";

import express from "express";
const router = express.Router();
export const contectmessagepost= async(req, res) => {
    try {
      const { userid, fullName, mobileNumber, subject, message } = req.body;
  
      if (!fullName || !mobileNumber || !subject || !message) {
        return res.status(400).json({ success: false, error: "All fields are required." });
      }
  
      const newMessage = new ContactMessage({
        userid,
        fullName,
        mobileNumber,
        subject,
        message,
      });
  
      await newMessage.save();
      res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Server Error: " + error.message });
    }
  };
  export default router;