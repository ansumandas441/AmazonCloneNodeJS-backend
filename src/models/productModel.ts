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
  interface ProductDocument extends Document {
    _id:string,
    name: string;
    price: number;
    description: string;
    tags: string[]
  }

// Define interface for the cart model
interface ProductModel extends Model<ProductDocument> {}  

// Defining the Product schema
const productSchema = new Schema<ProductDocument>({
    name: { type: String,required: true},
    price: {type: Number,required: true},
    description: {type: String},
    tags: [String],
});

//indexing by name field
productSchema.index({ name: 1 }); 

const Product: ProductModel = model<ProductDocument, ProductModel>('Product', productSchema);

export default Product;