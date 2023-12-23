const mongoose = require('mongoose');

const productShema = mongoose.Schema({
    title:String,
    imageUrl:String,
    Price:Number,
    rating:Number,
});

module.exports = mongoose.model('products', productShema);