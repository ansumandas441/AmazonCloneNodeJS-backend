const express = require('express');
const {
    handleUserRegistration,
    handleUserLogin,
    handleUserLogout,
    showLoginView,
} = require('../controllers/authController');
const router = express.Router();

router.post('/register', handleUserRegistration);
router.post('/login', handleUserLogin);
router.post('/logout', handleUserLogout);
router.get('/loginView', showLoginView);

module.exports = router;