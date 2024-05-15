import { Request, Response } from 'express';

import Cart from '../../models/cartModel.js';
import OrderStates from '../../models/orderStates.js';
import MyJwtPayload from '../../shared/MyJwtPayload.js';

const checkout = async (req: Request, res: Response) => {
  try {
    if(!req.user){
      return res.status(404).json({
        message:'No user found for this cart',
      });
    }
    console.log('Flag1');
    const existingUser = req.user as MyJwtPayload;
    const email = existingUser.email;
    const {
      address,
    } = req.body;
    if (!email) {return res.status(401).json({
      error: 'No email id provied',
    });}
    const cart = await Cart.findOne({
      email,
    });
    console.log('Flag2');
    // Emit an event indicating checkout has occurred
    const orderState = OrderStates.INITIATED;
    const eventData = {
      cart: cart,
      address: address,
      orderState: orderState,
    };

    //TO BE DONE WORK FOR SENDING ORDER
    console.log('Flag3');
    res.status(200).json({
      message: 'Success',
    });

  } catch (error) {
    console.log('Error processing the deleting the cart', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export default checkout;