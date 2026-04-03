import { Router } from 'express';
import { getFavorites, toggleFavorite } from '../controllers/favoriteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getFavorites);
router.post('/toggle', toggleFavorite);

export default router;
