import { updateReceptionist,deleteReceptionist,getallReceptionist,getsingleReceptionist } from "../api/receptation.js";
import express from "express";
const router=express.Router()
router.get('/allReceptionist',getallReceptionist)   
router.get('/singleReceptionist/:id',getsingleReceptionist)
router.put('/updateReceptionist/:id',updateReceptionist)
router.delete('/deleteReceptionist/:id',deleteReceptionist)
export default router;