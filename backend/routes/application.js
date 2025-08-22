import express from "express";
import { postinternship } from "../api/application.js";

const router=express.Router()
router.post("/apply",postinternship)
export default router;