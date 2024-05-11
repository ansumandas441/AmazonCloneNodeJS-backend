import { Router } from 'express';
import authController from '../controllers/authController';
import authMiddleWares from '../middlewares/authMiddleWares';
const router = Router();

router.post('/register', authMiddleWares.validateRegistrationSchema, authController.handleUserRegistration);
router.post('/verifyOtp', authMiddleWares.validateOtpSChema, authController.verifyOtp);
router.post('/login', authMiddleWares.validateLoginSchema,authController.handleUserLogin);
router.post('/logout', authController.handleUserLogout);

export default router;