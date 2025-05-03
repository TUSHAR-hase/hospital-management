import { set } from "mongoose";
import Receptionist from "../schemas/recption.js";
export const updateReceptionist=async(req,resp)=>{
  const id=req.params.id;
  try {
    const upadetReceptionistdetail=await Receptionist.findByIdAndUpdate(id,req.body,{$set:req.body},{new:true})
    resp.status(200).json({upadetReceptionistdetail,success:"true"});

    
  } catch (error) {
    resp.status(500).json({error:"error"});
    
  }
}
export const deleteReceptionist=async(res,resp)=>{
    const id=req.params.id;
    try {
        const deleteReceptionistdetail=await Receptionist.findByIdAndDelete(id)
        resp.status(200).json({deleteReceptionistdetail,success:"true"});
        
    } catch (error) {
        resp.status(500).json({error:"error"});
        
    }
}
export const getsingleReceptionist=async(res,resp)=>{
    const id=req.params.id;
    try {
        const getReceptionistdetail=await Receptionist.findById(id)
        resp.status(200).json({getReceptionistdetail,success:"true"});
        
    } catch (error) {
        resp.status(500).json({error:"error"});
        
    }
}
export const getallReceptionist=async(res,resp)=>{
    const id=req.params.id;
    try {
        const getallReceptionistdetail=await Receptionist.find({})
        resp.status(200).json({getallReceptionistdetail,success:"true"});
        
    } catch (error) {
        resp.status(500).json({error:"error"});
        
    }
}