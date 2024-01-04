const express = require('express');
const { handleUserRegistration, handleUserLogin } = require('../controllers/authController');
const router = express.Router();

router.post('/register',handleUserRegistration);
router.post('/login',handleUserLogin);
// router.post('/logout',handleUserLogOut);

module.exports = router;