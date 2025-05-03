import jwt from 'jsonwebtoken';
import  Doctor  from '../schemas/doctorschema.js';

import  Receptionist  from '../schemas/recption.js';
import  Patient  from '../schemas/patient.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    // console.log("Authorization Header:", authHeader); 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Please login first' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("JWT Verification Failed:", err.message);  // 👀 Debug JWT error
        return res.status(403).json({ message: 'Invalid token' });
      }
      // console.log("Decoded Token:", decoded);  // 👀 Check decoded data
      req.user = { _id: decoded.id };  // ✅ Store user ID correctly
      next();
    });
    
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const restrict= roles=>async(res,resp,next)=>{
const userId=res.params.id
let user;
const patient=await Patient.findById(userId);
const receptionist=await Receptionist.findById(userId);
const doctor=await Doctor.findById(userId);
if(patient){
    user=patient;
}
if(receptionist){
    user=receptionist;
}
if(doctor){
    user=doctor;
}
if(!roles.includes(user.role)){
    return res.status(403).json({ message: 'You do not have permission to access this'})
}

}
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // 
      console.log("Received Token:", token); // ✅ Debugging Step

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User no longer exists" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided, access denied" });
  }
};