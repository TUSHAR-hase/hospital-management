import express from 'express';
import nodemailer from 'nodemailer';
import { mailservice } from '../schemas/mail.js';

const router = express.Router();

// You can put this in a .env file


export const sendmail = async (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log("Received:", name, email, subject, message);
    const transporter = nodemailer.createTransport({
        service: "gmail", // You can also use SMTP server details directly
        auth: {
            user: "rohitacharya051005@gmail.com", // your email address
            pass: "hzbv shzk gesa lkxg", // your email password (use app-specific password for Gmail)
        },
    });
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    const newmeaasge = new mailservice({
        name,
        email,
        subject,
        message
    })
    await newmeaasge.save();

    const mailOptions = {
        from: email,
        to:"rohitacharya051005@gmail.com",
        subject: `[Contact] ${subject} from ${name}`,
        text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err });
    }
};


export default router;
