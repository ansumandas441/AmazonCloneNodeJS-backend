const express = require('express');
const router = express.Router();
const {addOrUpdateToCart, deleteFromCart, deleteCart, viewCart, calculatePrice, checkoutCart} = require('../controllers/cartController');

router.post('/add', addOrUpdateToCart);
router.post('/remove', deleteFromCart);
router.post('/update', addOrUpdateToCart);
router.post('/view', viewCart);
router.post('/clear', deleteCart);
router.post('/checkout', checkoutCart);
// router.post('/coupon'), ;
router.post('/total', calculatePrice);
router.post('/save');

module.exports = router;
