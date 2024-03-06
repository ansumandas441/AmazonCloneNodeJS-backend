const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    email: { type: String, required: true },
    products: [{
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true},
      total: {type: Number, default: 0},
      quantity: { type: Number, default: 1 },
  }],
    subTotalPrice: { type: Number, default: 0},
  });
  
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;