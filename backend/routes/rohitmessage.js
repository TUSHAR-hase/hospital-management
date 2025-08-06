// ✅ rohitmessage.js
import express from 'express';
import { sendmailrohit } from '../api/messagerohit.js'; // Use named import

const router = express.Router();

router.post("/sendmailrohit", sendmailrohit);

export default router;
