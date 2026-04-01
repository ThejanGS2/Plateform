import { Router } from 'express';
import { getCategories, getFoods, getFoodById } from '../controllers/foodController';

const router = Router();

router.get('/categories', getCategories);
router.get('/foods', getFoods);
router.get('/foods/:id', getFoodById);

export default router;
