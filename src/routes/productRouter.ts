import { Router } from 'express';
const router = Router();
import ProductController from '../controllers/productController/index.js';
import productMiddleWares from '../middlewares/productMiddleWares.js';

//Route for getting all the products
router.get('/getAll', productMiddleWares.validatePageDetails, ProductController.getAllProducts);

//Route for getting all products
router.get('/getById', productMiddleWares.validateProductId, ProductController.getProductById);

// Route for getting product details
router.get('/getByName', productMiddleWares.validateProductName, ProductController.getProductByName);

// Route for adding a product
router.post('/add', productMiddleWares.validateProduct, ProductController.addProduct);

//Route for editing a product
router.put('/edit', productMiddleWares.validateProductId, productMiddleWares.validateProduct, ProductController.editPrice);

//Route for deleting a product
router.delete('/delete', productMiddleWares.validateProductId, ProductController.deleteProduct);

//ROute for searching the product in the database
router.get('/search', productMiddleWares.validateProductName, ProductController.searchProduct);

// Add more routes as needed

export default router;