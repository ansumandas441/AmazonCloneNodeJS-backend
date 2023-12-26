const express = require('express');
const { handleUserRegistration } = require('../controllers/userController');
const router = express.Router();

router.post('/register',handleUserRegistration);
// router.post('/login',handleUserLogin);
// router.post('/logout',handleUserLogOut);

module.exports = router;