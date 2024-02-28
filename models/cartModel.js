const mongoose = require("mongoose");

// Define the Mongoose schema
const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true},
    total: {type: Number, default: 0},
    quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    products: [cartItemSchema],
    subTotalPrice: { type: Number, default: 0},
  });
  
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;