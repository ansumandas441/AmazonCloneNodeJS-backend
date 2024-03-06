const express = require('express');
const router = express.Router();
const {
    cartController
} = require('../controllers/cartController');

router.post('/add', cartController.addToCart);
router.post('/checkout', cartController.checkoutCart);
// router.post('/coupon'), ;
router.post('/total', cartController.calculatePrice);
router.post('/save');
router.put('/edit', cartController.updateCart);
router.get('/view', cartController.viewCart);
router.delete('/remove', cartController.deleteFromCart);
router.delete('/clear', cartController.deleteCart);


module.exports = router;