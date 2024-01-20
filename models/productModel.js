const mongoose = require("mongoose");

// Define the Mongoose schema
const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String
    },
    tags: [String],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;