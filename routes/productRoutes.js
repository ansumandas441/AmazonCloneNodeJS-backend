const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route for adding a product
router.post('/add', productController.addProduct);

// Route for getting product details
router.get('/:id', productController.getProductByName);

// Add more routes as needed

module.exports = router;