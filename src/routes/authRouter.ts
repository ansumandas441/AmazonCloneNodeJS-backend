import { Router } from 'express';

import authController from '../controllers/authController/index.js';
import authMiddleWares from '../middlewares/authMiddleWares.js';
const router = Router();

router.post('/register', authMiddleWares.validateRegistrationSchema, authController.handleUserRegistration);
router.post('/verifyOtp', authMiddleWares.validateOtpSChema, authController.verifyOtp);
router.post('/login', authMiddleWares.validateLoginSchema,authController.handleUserLogin);
router.post('/logout', authController.handleUserLogout);

export default router;