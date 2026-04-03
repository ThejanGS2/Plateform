import { Router } from 'express';
import { register, login, verifyEmail, resendCode, forgotPassword, verifyResetCode, resetPassword, updateProfile } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-code', resendCode);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/reset-password', resetPassword);

router.post('/update-profile', authMiddleware, updateProfile);

export default router;
