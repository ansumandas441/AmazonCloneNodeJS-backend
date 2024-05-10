import { Router } from 'express';
const router = Router();
import ProductController from '../controllers/productController';

//Route for getting all the products
router.get('/getAll', ProductController.getAllProducts);

//Route for getting all products
router.get('/getById', ProductController.getProductById);

// Route for getting product details
router.get('/getByName', ProductController.getProductByName);

// Route for adding a product
router.post('/add', ProductController.addProduct);

//Route for editing a product
router.put('/edit', ProductController.editPrice);

//Route for deleting a product
router.delete('/delete', ProductController.deleteProduct);

//ROute for searching the product in the database
router.get('/search', ProductController.searchProduct);

// Add more routes as needed

export default router;