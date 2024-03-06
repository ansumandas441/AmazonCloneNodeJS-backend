const {
    Timestamp
} = require('mongodb');
const Order = require('../models/orderModel');

const orderController = {

    placeSingleOrder: (req, res) => {
        try {
            const productId = req.productId;
            // const order = Order.
        } catch (error) {
            console.error(`error: ${error}`);
            res.status(500).json({
                message: 'INternal Server Error',
                error
            });
        }
    },

    placeCartOrder: async (cart, address, status) => {
        try {
            console.log(`TOKENP ${status}`)
            const productItems = cart.products.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }));
            const oder = {
                userId: cart.email,
                products: productItems,
                shippingAddress: address,
                status: status,
            }
            const result = await Order.create(oder);
            return result !== undefined;

        } catch (error) {
            console.error(`error: ${error}`);
        }
    },

    getOrders: (req, res) => {
        try {

        } catch (error) {
            console.error(`error: ${error}`);
            res.status(500).json({
                message: 'Internal Server Error',
                error
            });
        }
    },

    getOrderStatus: (req, res) => {
        try {

        } catch (error) {
            console.error(`error: ${error}`);
            res.status(500).json({
                message: 'Internal Server Error',
                error
            });
        }
    },

    getOrderDetail: (req, res) => {
        try {

        } catch (error) {
            console.error(`error: ${error}`);
            res.status(500).json({
                message: 'Internal Server Error',
                error
            });
        }
    },

    getOrderStatus: (req, res) => {
        try {

        } catch (error) {
            console.error(`error: ${error}`);
            res.status(500).json({
                message: 'Internal Server Error',
                error
            });
        }
    }
}

module.exports = orderController;