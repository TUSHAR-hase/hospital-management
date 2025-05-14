import express from 'express';

import { sendmail } from '../api/message.js';


const router= express.Router();

router.post("/sendmail",sendmail)

export default router;