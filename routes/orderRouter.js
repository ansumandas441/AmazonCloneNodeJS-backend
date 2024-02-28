const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/getOrders', orderController.getOrders);
router.post('/getOrderDetail/:orderId', orderController.getOrderDetail);
router.post('/getOrderStatus/:orderId', orderController.getOrderStatus);

module.exports = router;