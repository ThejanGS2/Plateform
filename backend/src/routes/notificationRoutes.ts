import { Router } from 'express';
import { getAllNotifications, getMyNotifications, markAsRead } from '../controllers/notificationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/all', getAllNotifications);  // admin: all notifications
router.get('/', getMyNotifications);
router.put('/:id/read', markAsRead);

export default router;
