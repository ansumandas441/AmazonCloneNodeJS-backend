/**
 *@swagger
 * tags:
 *   name: Cart
 *   description: Operations related to shopping cart
 * /cart/add:
 *   post:
 *     summary: Add item to cart
 *     description: Add an item to the shopping cart
 *     parameters:
 *       - in: body
 *         name: item
 *         description: Item details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             productId:
 *               type: string
 *               description: ID of the product
 *             quantity:
 *               type: integer
 *               description: Quantity of the product
 *     responses:
 *       '200':
 *         description: Item added successfully
 *       '400':
 *         description: Invalid request
 */

import { Router } from 'express';
const router = Router();
import cartController from '../controllers/cartController';

router.post('/add', cartController.addToCart);
router.post('/checkout', cartController.checkoutCart);
// router.post('/coupon'), ;
router.get('/total', cartController.calculatePrice);
router.post('/save');
router.put('/edit', cartController.updateCart);
router.get('/view', cartController.viewCart);
router.delete('/remove', cartController.deleteFromCart);
router.delete('/clear', cartController.deleteCart);


export default router;