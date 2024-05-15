import { Timestamp } from 'mongodb';
import { Request, Response } from 'express';

import session from '../service/auth.js';
import Order from '../models/orderModel.js';

const orderController = {

  // placeSingleOrder: (req: Request, res: Response) => {
  //     try {
  //         const productId = req.productId;
  //         // const order = Order.
  //     } catch (error) {
  //         console.error(`error: ${error}`);
  //         res.status(500).json({
  //             message: 'INternal Server Error',
  //             error
  //         });
  //     }
  // },

  // placeCartOrder: async (cart, address, status) => {
  //     try {
  //         console.log(`TOKENP ${status}`)
  //         const productItems = cart.products.map(item => ({
  //             productId: item.productId,
  //             quantity: item.quantity
  //         }));
  //         const oder = {
  //             userId: cart.email,
  //             products: productItems,
  //             shippingAddress: address,
  //             status: status,
  //         }
  //         const result = await create(oder);
  //         return result !== undefined;

  //     } catch (error) {
  //         console.error(`error: ${error}`);
  //     }
  // },

  // getOrders: async (req: Request, res: Response) => {
  //     try {
  //         const email = req.user.email;
  //         const orders = await find({userId: userId});
  //         if(!orders){
  //             return res.status(401).json({
  //                 error: 'No data found'
  //             });
  //         }
  //         res.status(201).json({
  //             orders:orders
  //         });
            
  //     } catch (error) {
  //         console.error(`error: ${error}`);
  //         res.status(500).json({
  //             message: 'Internal Server Error',
  //             error
  //         });
  //     }
  // },

  // getOrderStatus: async (req: Request, res: Response) => {
  //     try {
  //         const email = req.user.email;
  //         const orderId = req.body.orderId;
  //         const orders = await find({userId: userId});
  //         if(orders.some(item=>item._id.toString()===orderId)){
  //             return res.status(500).json({
  //                 status: "success",
  //                 message: 'The order exists',
  //             });
  //         }
  //         res.status(401).json({
  //             status: "failure",
  //             message: 'The order does not exist',
  //         });
  //     } catch (error) {
  //         console.error(`error: ${error}`);
  //         res.status(500).json({
  //             message: 'Internal Server Error',
  //             error
  //         });
  //     }
  // },

  // getOrderDetail: async (req: Request, res: Response) => {
  //     try {
  //         const email = req.user.email;
  //         const orderId = req.body.orderId;
  //         const orders = await find({userId: userId});
  //         const order = orders.find(item=>item._id.toString()===orderId)
  //         if(order){
  //             return res.status(500).json({
  //                 status: "success",
  //                 orderDetails: order,
  //             });
  //         }
  //         res.status(401).json({
  //             status: "failure",
  //             message: 'The order does not exist',
  //         });
  //     } catch (error) {
  //         console.error(`error: ${error}`);
  //         res.status(500).json({
  //             message: 'Internal Server Error',
  //             error
  //         });
  //     }
  // },
};

export default orderController;