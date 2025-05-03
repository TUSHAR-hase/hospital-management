import express from 'express'
import { createreview, getalreview } from '../api/review.js'
import { authenticate, protect, restrict } from '../auth/authenticate.js'

const router = express.Router({ mergeParams: true })
router.get('/allReviews/:id', getalreview);
router.post('/createReview/:id', createreview);

export default router