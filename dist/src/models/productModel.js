import { Schema, model } from 'mongoose';
// Defining the Product schema
const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    tags: [String],
});
//indexing by name field
productSchema.index({ name: 1 });
const Product = model('Product', productSchema);
export default Product;
