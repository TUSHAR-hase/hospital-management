import { getalluser,getsingleuser,updateuser,deleteuser } from "../api/registerupdate.js";
import express from "express";

import { authenticate,restrict } from "../auth/authenticate.js";
const router=express.Router()
router.get('/alluser',getalluser,authenticate,restrict(['patient']))   
router.get('/singleuser/:id',getsingleuser,authenticate)
router.put('/updateuser/:id',updateuser)
router.delete('/deleteuser/:id',authenticate,restrict(['patient']),deleteuser)
export default router;