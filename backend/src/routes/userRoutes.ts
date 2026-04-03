import { Router } from 'express';
import { getAddresses, addAddress, removeAddress, updateAddress, getPaymentMethods, addPaymentMethod, removePaymentMethod } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/addresses', getAddresses);
router.post('/addresses', addAddress);
router.patch('/addresses/:addressId', updateAddress);
router.delete('/addresses/:addressId', removeAddress);

router.get('/payments', getPaymentMethods);
router.post('/payments', addPaymentMethod);
router.delete('/payments/:paymentMethodId', removePaymentMethod);

export default router;
