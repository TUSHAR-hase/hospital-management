import express from 'express';
import { sendmail } from '../api/messagerohit';

// import { sendmail } from '../api/message.js';


const router= express.Router();

router.post("/sendmailrohit",sendmail)

export default router;