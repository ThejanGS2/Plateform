import { Router } from 'express';
import { placeOrder, getMyOrders, getOrderStatus } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/orders', authMiddleware, placeOrder);
router.get('/orders/my', authMiddleware, getMyOrders);
router.get('/orders/:id/status', authMiddleware, getOrderStatus);

export default router;
