import { Schema, model } from 'mongoose';
// Define the schema for the cart
const cartSchema = new Schema({
    email: { type: String, required: true },
    products: [{
            productId: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            total: { type: Number, default: 0 },
            quantity: { type: Number, default: 1 },
        }],
    subTotalPrice: { type: Number, default: 0 },
});
const Cart = model('Cart', cartSchema);
export default Cart;
