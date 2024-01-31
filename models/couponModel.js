const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    couponCode: {type: String, required: true},
    discountType: {type: String, required: true},
    discountValue: {type: Number, required: true},
    expirationDate: {type: String, required: true},
    usageLimit: {type: String, default: null},
    usedCount: {type: String, default: 0},
    productRestrinctions: {type: [String], defaults: []},
});