const mongoose = require('mongoose');

const productListModel = new mongoose.Schema({
    productId:{type: String, required:true},
    quantity:{type: Number, required:true}
});

const orderModel = new mongoose.Schema({
    userId:{type: String, required:true},
    products:[productListModel],
    shippingAdress:{type: String, required:true},
    status:{type: String, required:true},
    updatedAt: {type: String, default:null},
    paymentId: {type: String, required: true}
});

const Order = mongoose.model('Order',orderModel);

module.exports = orderModel;