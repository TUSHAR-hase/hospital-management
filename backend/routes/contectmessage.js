import express from "express";
import { contectmessagepost } from "../api/contectmessage.js";
const router=express.Router()
router.post("/sendmessage",contectmessagepost)
export default router;