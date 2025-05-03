import { deletedoctor,postdoctor,getalldoctor,getsingledoctor,updatedoctor,verifyOtp,login } from "../api/doctors.js";
import express from "express";
import reviewrouter from "./review.js";
const router=express.Router()
router.get("/doctorId/reviews",reviewrouter)
router.get('/alldoctor',getalldoctor)   
router.get('/singledoctor/:id',getsingledoctor)
router.post("/otp-veriyfy",verifyOtp)
router.post("/doctorlogin",login)

router.put('/updatedoctor/:id',updatedoctor)
router.delete('/deletedoctor/:id',deletedoctor)
router.post("/postdoctor",postdoctor)
export default router;