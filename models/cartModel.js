const mongoose = require("mongoose");

// Define the Mongoose schema
const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    price: { type: Number, required: true},
    quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    items: {type: Map, of: cartItemSchema},
  });
  
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;