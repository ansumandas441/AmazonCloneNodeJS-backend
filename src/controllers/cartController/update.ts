import { Request, Response } from 'express';

import Cart from '../../models/cartModel.js';
import Product from '../../models/productModel.js';
import MyJwtPayload from '../../shared/MyJwtPayload.js';

const update = async (req: Request, res: Response) => {
  try {
    if(!req.user){
      return res.status(404).json({
        message:'No user found for this cart',
      });
    }
    const existingUser = req.user as MyJwtPayload;
    const email = existingUser.email;
    const productId = req.body.productId;
    const quantity = Number.parseInt(req.body.quantity);
    if (!email) {return res.status(401).json({
      error: 'No email id provied',
    });}
    if (quantity < 0) {
      return res.status(400).json({
        code: 400,
        message: 'Invalid request',
      });
    }
    const cart = await Cart.findOne({
      email,
    });

    if (!cart) {
      return res.status(404).json({
        code: 404,
        message: 'Cart cound not be found',
      });
    }

    const product = await Product.find({
      _id: productId,
    });

    if (!product || product.length === 0) {
      return res.status(404).json({
        message: 'Product not found',
        productId,
      });
    }
    const productPrice = product[0].price;
    if (productPrice < 0) {
      // If quantity or price is negative(database error)
      return res.status(400).json({
        code: 400,
        message: 'Invalid request',
      });
    }

    // If the cart doesn't exist, create a new one
    // cart = await Cart.create({ email, products: {} });
    const indexFound = cart.products.findIndex(p => p.productId == productId);
    if (indexFound === -1) {
      return res.status(400).json({
        type: 'failure',
        mgs: 'Process Failed, this product does not exist in this cart for editing',
      });
    }

    cart.email = email;
    cart.products[indexFound].quantity = quantity;
    cart.products[indexFound].name = product[0].name;
    cart.products[indexFound].price = productPrice;
    cart.products[indexFound].total = quantity * productPrice;
    cart.subTotalPrice = cart.products.map(item => item.total).reduce((acc, curr) => acc + curr);

    const data = await cart.save();
    res.status(200).json({
      type: 'success',
      mgs: 'Process Successful',
      data: data,
    });

  } catch (error) {
    console.log('Error processing the add method', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export default update;