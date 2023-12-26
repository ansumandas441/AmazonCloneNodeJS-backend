const express = require('express');
const { handleUserSignup } = require('../controllers/userController');
const router = express.Router();

router.post('/',handleUserSignup);

module.exports = router;