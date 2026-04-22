import { Router } from 'express';
import * as wasteController from '../controllers/wasteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', wasteController.getWasteLogs);
router.post('/', wasteController.logWaste);
router.put('/:id', wasteController.updateWasteLog);
router.delete('/:id', wasteController.deleteWasteLog);

export default router;
