import Doctor from "../schemas/doctorschema.js";
import Patient from "../schemas/patient.js";
import receptionist from "../schemas/recption.js";
import nodemailer from "nodemailer";

import jwt from 'jsonwebtoken';
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../schemas/registerschema.js'; 

const router = express.Router();
const genarate_token =user=>{ 
    return jwt.sign({ id:user._id,role:user.role}, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "5d",
})}
 
export const register = async (req, resp) => {
    try {
        console.log('Register endpoint hit');
        const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;
        const { email, password, name, role, gender, image, contact,address} = req.body;
        console.log('Request data:', req.body);
  const otp = Math.floor(Math.random() * 10000);


        let existingUser = await Patient.findOne({ email })
        if (existingUser) {
            return resp.status(400).json({ message: "User already exists" });
        }
        console.log("Plain Password:", password);
        // const hashedPassword = await bcrypt.hash(password.trim(), 10);
        // console.log("Hashed Password Before Storing:", hashedPassword);
        let user = null;
        const transporter = nodemailer.createTransport({
            service: "gmail", // You can also use SMTP server details directly
            auth: {
              user: smtpUser, // your email address
              pass: smtpPass, // your email password (use app-specific password for Gmail)
            },
          });
          const mailOptions = {
            from: smtpUser, // sender address
            to: email, // list of recipients
            subject: "Welcome Hospital Management  OTP", // subject line
            // text: "Hello, this is a test email sent from Nodemailer!", // plain text body
            // Alternatively, you can send HTML body
            html: `<html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        color: #333;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }}
                    .container {{
                        background-color: #ffffff;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: 0 auto;
                    }}
                    h2 {{
                        color: #4CAF50;
                    }}
                    .otp-code {{
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        padding: 10px;
                        background-color: #f1f1f1;
                        border: 1px solid #ddd;
                        text-align: center;
                        border-radius: 5px;
                        margin: 20px 0;
                    }}
                    .footer {{
                        font-size: 12px;
                        color: #888;
                        text-align: center;
                        margin-top: 30px;
                    }}
                    .footer a {{
                        color: #4CAF50;
                        text-decoration: none;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to Hospital Management!</h2>
                    <p>Thank you for registering with us! To complete your account creation process, please verify your email address by entering the One-Time Password (OTP) below:</p>
                    <div class="otp-code">${otp}</div>
                    <p>The OTP is valid for the next 10 minutes. Please enter it in the required field to complete your registration.</p>
                    <p>If you did not request this, please disregard this email.</p>
                    <div class="footer">
                        <p>For any issues, feel free to contact our <a href="mailto:thakorrajat@gmail.com">support team</a>.</p>
                        <p>Thank you for choosing us!</p>
                        <p>Best regards, <br> The Hospital Management Team</p>
                    </div>
                </div>
            </body>
            </html>`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return resp.status(400).json({ message: "User already exists",error });
             
            } else {
              return true;
            }
          });                

        if (role === "doctor") {
            user = new Doctor({ name, email, password, role,image, gender,
                contact,address,otp,  isVerifiedOtp: false,
             });
        } else if (role === "patient") {
            user = new Patient({
                name,
                email,
                password,
                role,
                image,
                gender,
                contact,
                otp,
                isVerifiedOtp: false,
                address  // Includes phone & address
               // Includes name, relation, phone
             });
        } else if (role === "receptionist") {
            user = new receptionist({ name, email, password, role,image, gender,contact,address,otp,  isVerifiedOtp: false, });
        } else {
            return resp.status(400).json({ message: "Invalid role" });
        }

        await user.save();
        return resp.status(201).json({ message: "User created successfully", user });

    } catch (error) {
        console.error(error);
        return resp.status(500).json({ message: "Error creating user", error });
    }
};

export const verifyOtp = async (req, res) => {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email, otp } = req.body;
  
    let user = await Patient.findOne({ email }) ||
    await Doctor.findOne({ email }) ||
    await receptionist.findOne({ email });
  
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    
    }
  
    if (user.isVerifiedOtp) {
      return res
        .status(400).json({message: "User already verified"});
    }
  
    // if (user.otp !== otp) {
    //   return res.status(400).json({ message:"Invalid OTP"});
    // }
  
    user.isVerifiedOtp = true;
    await user.save();
  
    const token = jwt.sign({ user }, SECRET_KEY);
  
    res
      .status(200)
      .json({ message:"User verified successfully"});
  };
  
export const login = async (req, res) => {
    try {
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASSWORD;
        const { email, password } = req.body;
        console.log("Login attempt:", email); 
        const otp = Math.floor(Math.random() * 10000);
  
        let user =  
        await Patient.findOne({email})|| await Doctor.findOne({ email }) ||
       
         await receptionist.findOne({ email });
                  
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
  

      
       console.log(user.password)
        const isValidPassword = await bcrypt.compare(password, user.password);

        console.log("Password match:", isValidPassword);
        console.log(password.trim())
        // if(password!=user.password){
        //     return res.status(500).json({ message: "password not match" });
        // }
     

        if (!user.isVerifiedOtp) {
            user.otp = otp;
            await user.save();
            // Create a transporter object using the default SMTP transport (Gmail in this case)
            const transporter = nodemailer.createTransport({
              service: "gmail", // You can also use SMTP server details directly
              auth: {
                user: smtpUser, // your email address
                pass: smtpPass, // your email password (use app-specific password for Gmail)
              },
            });
        
            // Setup email data
            const mailOptions = {
              from: smtpUser, // sender address
              to: email, // list of recipients
              subject: "Welcome Hospital Management  OTP", // subject line
              // text: "Hello, this is a test email sent from Nodemailer!", // plain text body
              // Alternatively, you can send HTML body
              html: `<html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        color: #333;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }}
                    .container {{
                        background-color: #ffffff;
                        padding: 30px;
                        border-radius: 8px;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        max-width: 600px;
                        margin: 0 auto;
                    }}
                    h2 {{
                        color: #4CAF50;
                    }}
                    .otp-code {{
                        font-size: 24px;
                        font-weight: bold;
                        color: #333;
                        padding: 10px;
                        background-color: #f1f1f1;
                        border: 1px solid #ddd;
                        text-align: center;
                        border-radius: 5px;
                        margin: 20px 0;
                    }}
                    .footer {{
                        font-size: 12px;
                        color: #888;
                        text-align: center;
                        margin-top: 30px;
                    }}
                    .footer a {{
                        color: #4CAF50;
                        text-decoration: none;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to Hospital Management!</h2>
                    <p>Thank you for registering with us! To complete your account creation process, please verify your email address by entering the One-Time Password (OTP) below:</p>
                    <div class="otp-code">${otp}</div>
                    <p>The OTP is valid for the next 10 minutes. Please enter it in the required field to complete your registration.</p>
                    <p>If you did not request this, please disregard this email.</p>
                    <div class="footer">
                        <p>For any issues, feel free to contact our <a href="mailto:thakorrajat859@gmail.com">support team</a>.</p>
                        <p>Thank you for choosing us!</p>
                        <p>Best regards, <br> The Hospital Management Team</p>
                    </div>
                </div>
            </body>
            </html>`,
            };
        
            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res
                  .status(500)
                  .json({message: "Error sending email"});
              } else {
                return true;
              }
            });
        
            return res
              .status(400)
              .json({message: "User not verified"});
          }
        const token = genarate_token(user);
        return res.status(200).json({ message: "Login successful", user, token });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

