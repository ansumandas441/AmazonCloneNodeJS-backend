const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route for adding a product
router.post('/add', productController.addProduct);

//Route for editing a product
router.post('/edit/:id', productController.editPrice);

//Route for deleting a product
router.post('/delete/:id', productController.deleteProduct);

//Route for getting all products
router.get('/getById', productController.getProductById);

// Route for getting product details
router.get('/getByName/:name', productController.getProductByName);

//Route for getting all the products
router.get('/getAll', productController.getAllProducts);

//ROute for searching the product in the database
router.get('/search', productController.searchProduct);

// Add more routes as needed

module.exports = router;