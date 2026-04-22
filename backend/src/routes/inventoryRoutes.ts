import { Router } from 'express';
import * as inventoryController from '../controllers/inventoryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', inventoryController.getIngredients);
router.post('/', inventoryController.createIngredient);
router.put('/:id', inventoryController.updateIngredient);
router.delete('/:id', inventoryController.deleteIngredient);
router.patch('/:id/stock', inventoryController.updateStock);

export default router;
