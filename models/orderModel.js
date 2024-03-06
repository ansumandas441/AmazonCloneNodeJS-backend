const mongoose = require('mongoose');


const orderModel = new mongoose.Schema({
    userId:{type: String, required:true},
    products:[{
        productId:{type: String, required:true},
        quantity:{type: Number, required:true},
    }],
    shippingAddress:{type: String, required:true},
    status:{type: String, required:true},
    updatedAt: {type: Date, default:Date.now},
    paymentId: {type: String, default:"NULL"}
});

const Order = mongoose.model('Order',orderModel);

module.exports = Order;