import { Schema, Document, model, Model } from 'mongoose';

// Define interface for product item in the cart
interface ProductItem {
  productId: string;
  name: string;
  price: number;
  total: number;
  quantity: number;
}

// Define interface for the cart document
interface CartDocument extends Document {
  email: string;
  products: ProductItem[];
  subTotalPrice: number;
}

// Define interface for the cart model
interface CartModel extends Model<CartDocument> {}

// Define the schema for the cart
const cartSchema = new Schema<CartDocument>({
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
  
const Cart: CartModel = model<CartDocument, CartModel>('Cart', cartSchema);

export default Cart;