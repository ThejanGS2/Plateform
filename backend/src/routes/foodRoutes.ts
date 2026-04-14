import { Router } from 'express';
import { getCategories, getFoods, getFoodById, createFood, updateFood, deleteFood } from '../controllers/foodController';

const router = Router();

router.get('/categories', getCategories);
router.get('/foods', getFoods);
router.get('/foods/:id', getFoodById);
router.post('/foods', createFood);
router.put('/foods/:id', updateFood);
router.delete('/foods/:id', deleteFood);

export default router;
