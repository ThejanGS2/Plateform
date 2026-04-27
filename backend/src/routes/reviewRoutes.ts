import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { getReviews, getMyReviews, createReview, deleteReview } from '../controllers/reviewController';

const router = express.Router();

router.get('/',       authMiddleware, getReviews);
router.get('/my',     authMiddleware, getMyReviews);
router.post('/',      authMiddleware, createReview);
router.delete('/:id', authMiddleware, deleteReview);

export default router;
