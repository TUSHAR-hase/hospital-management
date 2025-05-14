import express from 'express';
import nodemailer from 'nodemailer';
import { mailservice } from '../schema/mail.js';

const router = express.Router();
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASSWORD;
// You can put this in a .env file


export const sendmail = async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log("Received:", name, email, subject, message);
    const transporter = nodemailer.createTransport({
        service: "gmail", // You can also use SMTP server details directly
        auth: {
            user: smtpUser, // your email address
            pass: smtpPass, // your email password (use app-specific password for Gmail)
        },
    });
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS:', process.env.SMTP_PASSWORD);

    const newmeaasge = new mailservice({
        name,
        email,
        subject,
        message
    })
    await newmeaasge.save();

    const mailOptions = {
        from: email,
        to: process.env.SMTP_USER,
        subject: `[Contact] ${subject} from ${name}`,
        text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
    };

    try {
        // await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send email' });
    }
};


export default router;
