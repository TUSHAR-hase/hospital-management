// ✅ messagerohit.js
import express from 'express';
import nodemailer from 'nodemailer';
import { mailservicerohit } from '../schemas/rohitmail.js';

export const sendmailrohit = async (req, res) => {
  const { name, email, subject, message } = req.body;
    console.log("Received:", name, email, subject, message);

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newMessage = new mailservicerohit({ name, email, subject, message });
  await newMessage.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rohitacharya051005@gmail.com",
      pass: "hzbv shzk gesa lkxg",
    },
  });

  const mailOptions = {
    from: email,
    to: "rohitacharya051005@gmail.com",
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
    res.status(500).json({ message: 'Failed to send email', error: err });
  }
};
