const mongoose = require("mongoose");

// Defining the Product schema
const productSchema = new mongoose.Schema({
    name: { type: String,required: true},
    price: {type: Number,required: true},
    description: {type: String},
    tags: [String],
});

//indexing by name field
productSchema.index({ name: 1 }); 

const Product = mongoose.model('Product', productSchema);

module.exports = Product;