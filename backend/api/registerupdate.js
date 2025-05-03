import { set } from "mongoose";
import User from "../schemas/patient.js";
import Patient from "../schemas/patient.js";
export const updateuser=async(req,resp)=>{
  const id=req.params.id;
  try {
    const upadetuserdetail=await Patient.findByIdAndUpdate(id,req.body,{new:true})
    resp.status(200).json({upadetuserdetail,success:"true"});

    
  } catch (error) {
    resp.status(500).json({error:"error"});
    
  }
}
export const deleteuser=async(res,resp)=>{
    const id=req.params.id;
    try {
        const deleteuserdetail=await User.findByIdAndDelete(id)
        resp.status(200).json({deleteuserdetail,success:"true"});
        
    } catch (error) {
        resp.status(500).json({error:"error"});
        
    }
}
export const getsingleuser=async(res,resp)=>{
    const { id } = res.params;
    console.log(id)
    try {
        const getuserdetail=await Patient.findById(id)
        resp.status(200).json({getuserdetail,success:"true"});
        
    } catch (error) {
        resp.status(500).json({error:"error"});
        
    }
}
export const getalluser=async(res,resp)=>{
    const id=req.params.id;
    try {
        const getalluserdetail=await User.find({})
        resp.status(200).json({getalluserdetail,success:"true"});
        
    } catch (error) {
        resp.status(500).json({error:"error"});
        
    }
}