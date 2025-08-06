import express from 'express';
import sendmailrohit from '../api/messagerohit.js';
// import { sendmail } from '../api/message.js';


const router= express.Router();

router.post("/sendmailrohit",sendmailrohit)

export default router;