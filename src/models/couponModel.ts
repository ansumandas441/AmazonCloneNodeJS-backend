import { Schema, model } from 'mongoose';

const couponSchema = new Schema({
  couponCode: {type: String, required: true},
  discountType: {type: String, required: true},
  discountValue: {type: Number, required: true},
  expirationDate: {type: String, required: true},
  usageLimit: {type: String, default: null},
  usedCount: {type: String, default: 0},
  productRestrinctions: {type: [String], defaults: []},
});

const Coupon = model('Coupon',couponSchema);

export default Coupon;