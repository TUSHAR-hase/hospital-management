import { set } from "mongoose";
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import Doctor from "../schemas/doctorschema.js";
const genarate_token =user=>{ 
    return jwt.sign({ id:user._id,role:user.role}, process.env.JWT_TOKEN_SECRET, {
    expiresIn: "5d",
})}
export const updatedoctor=async(req,resp)=>{
  const id=req.params.id;
  console.log(`update doctor ${id}`)  
  console.log(req.body)  
  try {
    const upadetdoctordetail=await Doctor.findByIdAndUpdate(id,req.body,{new:true})
    resp.status(200).json({upadetdoctordetail,success:"true"});

    
  } catch (error) {
    resp.status(500).json({error:"error"});
    
  }
}
export const deletedoctor=async(res,resp)=>{
    const id=req.params.id;
    try {
        const deletedoctordetail=await Doctor.findByIdAndDelete(id)
        resp.status(200).json({deletedoctordetail,success:"true"});
        
    } catch (error) {
        resp.status(500).json({error:"error"});
        
    }
}
export const getsingledoctor=async(req,resp)=>{
    const id=req.params.id;
    console.log(`get single doctor ${id}`)
 
    try {
        const getdoctordetail=await Doctor.findById(id)
        resp.status(200).json({getdoctordetail,success:"true"});
        
    } catch (error) {
        resp.status(500).json({error:"error"});
        
    }
}

 
export const login = async (req, res) => {
    try {
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASSWORD;
        const { email, password } = req.body;
        console.log("Login attempt:", email); 
        const otp = Math.floor(Math.random() * 10000);
  
        let user = await Patient.findOne({email})||
                   await Doctor.findOne({ email }) ||
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


export const getalldoctor=async(resp,res)=>{
    try {
        let doctor =await Doctor.find({ isApproved: "true"});
        // console.log(doctor)
        res.status(200).json({ doctor, success: "true" });
    } catch (error) {
        console.error("Error in getalldoctor API:", error); // Log error details
                res.status(500).json({ error: "Internal Server Error" });
    }
}


// POST API to register a doctor
export const postdoctor=async(req, resp)=> {
    try {
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASSWORD;
        const { name, email, password, gender, image, specialization, experience, qualifications, bio, contact, availability } = req.body;
//   const otp = Math.floor(Math.random() * 10000);
const otp = Math.floor(1000 + Math.random() * 9000);


        if (!contact || !contact.phone || !contact.address) {
            return resp.status(400).json({ message: "Contact details are required!" });
        }
        // Check if the doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return resp.status(400).json({ message: "Doctor already exists!" });
        }
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
        // Create a new doctor instance
        const newDoctor = new Doctor({
            name,
            email,
            password, 
            gender,
            image,
            specialization,
            experience,
            qualifications,
            bio,
            contact,
            otp,  isVerifiedOtp: false,
            availability
        });

        
        await newDoctor.save();
        const token = genarate_token(newDoctor);


        resp.status(201).json({ message: "Doctor registered successfully!", doctor: newDoctor ,token});
    } catch (error) {
        resp.status(500).json({ message: "Server error!", error: error.message });
    }
};
export const verifyOtp = async (req, res) => {
    const SECRET_KEY = process.env.SECRET_KEY;
    const { email, otp } = req.body;
  
    let user =await Doctor.findOne({ email }) 
 
  
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    
    }
  
    if (user.isVerifiedOtp) {
      return res
        .status(400).json({message: "User already verified"});
    }
  
    if (user.otp !== otp) {
      return res.status(400).json({ message:"Invalid OTP"});
    }
  
    user.isVerifiedOtp = true;
    await user.save();
  
    const token = jwt.sign({ user }, SECRET_KEY);
  
    res
      .status(200)
      .json({ message:"User verified successfully"});
  };
  

