import { Router } from 'express';
import { getCart, addToCart, updateCartItem } from '../controllers/cartController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getCart);
router.post('/', addToCart);
router.put('/', updateCartItem);

export default router;
