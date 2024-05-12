import Product from "../../models/productModel.js";
import { Request, Response } from 'express';

const deleteElement = async (req: Request, res: Response) => {
    try {
      let productId = req.query.id;
      const deletedProduct = await Product.findByIdAndDelete(
        productId
      );
      if (!deletedProduct) {
        return res.status(404).json({
          error: 'Product not found'
        });
      }
      res.status(200).json({
        message: 'Product deleted successfully'
      });
    } catch (error) {
      console.log('Error deleting the product', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
}

export default deleteElement;
  