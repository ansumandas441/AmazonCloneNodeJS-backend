const express = require('express');
const paymentController = require('../controllers/paymenyController');
const router = express.Router();

router.post('/create-payment-intent', paymentController.handlePaymentIntent);
router.post('/confirm-payment', paymentController.handlePaymentConfirmation);

module.exports = router;

