const Order = require('../models/cartModel');

const orderController = {

    placeSingleOrder: (req,res)=>{
        try {
            const productId = req.productId;
            // const order = Order.
        } catch(error) {
            console.error(`error: ${error}`);
            res.status(500).json({message: 'INternal Server Error',error});
        }
    },

    placeCartOrder: (req,res)=>{
        try {

        } catch(error) {
            console.error(`error: ${error}`);
            res.status(500).json({message: 'INternal Server Error',error});
        }
    },

    getOrders: (req,res) =>{
        try{

        }catch(error) {
            console.error(`error: ${error}`);
            res.status(500).json({message: 'Internal Server Error',error});
        }
    },

    getOrderStatus: (req,res) =>{
        try{

        }catch(error) {
            console.error(`error: ${error}`);
            res.status(500).json({message: 'Internal Server Error',error});
        }
    },

    getOrderDetail: (req,res) =>{
        try{

        }catch(error) {
            console.error(`error: ${error}`);
            res.status(500).json({message: 'Internal Server Error',error});
        }
    },

    getOrderStatus: (req,res) =>{
        try{

        }catch(error) {
            console.error(`error: ${error}`);
            res.status(500).json({message: 'Internal Server Error',error});
        }
    }
}

module.exports = orderController;
