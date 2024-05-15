import { Router } from 'express';

const router = Router();
import ProductController from '../controllers/productController/index.js';
import productMiddleWares from '../middlewares/productMiddleWares.js';
import redisMiddleWare from '../middlewares/redisMiddleWare.js';

// Middleware grouping for product ID operations
const productIdMiddlewares = [
  productMiddleWares.validateProductId,
  redisMiddleWare.checkProductIdCache,
];

// Middleware grouping for product name operations
const productNameMiddlewares = [
  productMiddleWares.validateProductName,
  redisMiddleWare.checkProductNameCache,
];

// Middleware grouping for invalidating caches
const invalidateNameCaches = [
  redisMiddleWare.invalidateNameCache,
  redisMiddleWare.invalidateSearchCache,
];

// Middleware grouping for invalidating caches
const invalidateAllCaches = [
  redisMiddleWare.invalidateIdCache,
  redisMiddleWare.invalidateNameCache,
  redisMiddleWare.invalidateSearchCache,
];

//Route for getting all the products
router.get('/getAll', productMiddleWares.validatePageDetails, ProductController.getAllProducts);

//Route for getting product by ID
router.get('/getById', ...productIdMiddlewares, ProductController.getProductById);

// Route for getting product by name
router.get('/getByName', ...productNameMiddlewares, ProductController.getProductByName);

// Route for adding a product
router.post('/add', productMiddleWares.validateProduct, ...invalidateNameCaches, ProductController.addProduct);

//Route for editing a product
router.put('/edit', ...productIdMiddlewares, productMiddleWares.validateProduct, ...invalidateAllCaches, ProductController.editPrice);

//Route for deleting a product
router.delete('/delete', ...productIdMiddlewares, ...invalidateAllCaches, ProductController.deleteProduct);

//Route for searching the product in the database
router.get('/search', productNameMiddlewares, redisMiddleWare.checkSearchCache, ProductController.searchProduct);

// Add more routes as needed

export default router;