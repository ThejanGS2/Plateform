import { Router } from 'express';
import { placeOrder, getMyOrders, getOrderStatus, getAllOrders, updateOrderStatus } from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, placeOrder);
router.get('/my', authMiddleware, getMyOrders);
router.get('/all', authMiddleware, getAllOrders);
router.get('/:id/status', authMiddleware, getOrderStatus);
router.put('/:id/status', authMiddleware, updateOrderStatus);

export default router;
