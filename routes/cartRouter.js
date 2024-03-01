const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addOrUpdateToCart);
router.post('/remove', cartController.deleteFromCart);
router.post('/update', cartController.addOrUpdateToCart);
router.post('/view', cartController.viewCart);
router.post('/clear', cartController.deleteCart);
router.post('/checkout', cartController.checkoutCart);
// router.post('/coupon'), ;
router.post('/total', cartController.calculatePrice);
router.post('/save');

module.exports = router;
