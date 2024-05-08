const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/getOrders', orderController.getOrders);
router.get('/getOrderDetail', orderController.getOrderDetail);
router.get('/getOrderStatus', orderController.getOrderStatus);

module.exports = router;