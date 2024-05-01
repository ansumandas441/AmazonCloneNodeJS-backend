const express = require('express');
const {
    handleUserRegistration,
    verifyOtp,
    handleUserLogin,
    handleUserLogout
} = require('../controllers/authController');
const router = express.Router();

router.post('/register', handleUserRegistration);
router.post('/verifyOtp', verifyOtp);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);

module.exports = router;