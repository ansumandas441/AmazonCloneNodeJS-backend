import { Request, Response } from 'express';

import Cart from '../../models/cartModel.js';
import MyJwtPayload from '../../shared/MyJwtPayload.js';

const view = async (req: Request, res: Response) => {
  try {
    if(!req.user){
      return res.status(404).json({
        message:'No user found for this cart',
      });
    }
    const existingUser = req.user as MyJwtPayload;
    const email = existingUser.email;
    if (!email) {return res.status(401).json({
      error: 'No email id provied',
    });}
    const cart = await Cart.findOne({
      email,
    });
    if (!cart){
      return res.status(404).json({
        error: 'No cart found with this email id',
      });
    }
    res.status(200).json({
      cart: cart,
      totalPrice: cart.subTotalPrice,
    });
  } catch (error) {
    console.log('Error processing the getting the cart', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export default view;