import { Router } from 'express';
import authController from '../controllers/authController';
const router = Router();
router.post('/register', authController.handleUserRegistration);
router.post('/verifyOtp', authController.verifyOtp);
router.post('/login', authController.handleUserLogin);
router.post('/logout', authController.handleUserLogout);
export default router;
