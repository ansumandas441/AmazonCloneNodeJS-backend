import Product from "../../models/productModel.js";
import { Request, Response } from 'express';

const edit = async (req: Request, res: Response) => {
    try {
      let productId: string | null = 'id' in req.query ? req.query.id as string : null;
      let name: string | null = 'name' in req.body ? req.body.name as string : null;
      let price: string | null = 'price' in req.body ? req.body.price as string : null;
      let description: string | null = 'description' in req.body ? req.body.description as string : null;
      let tags: string[] | null = 'tags' in req.body ? req.body.tags as string[] : null;
      if (!name || !price) {
        return res.status(400).json({
          error: "Name and price are required fields"
        });
      }
      const updatedProduct = await Product.findByIdAndUpdate(
        productId, {
          name,
          price,
          description,
          tags
        }, {
          new: true
        }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          error: 'Product not found'
        });
      }
      console.log({
        message: 'Product details edited successfully'
      });
      res.status(200).json({
        updatedProduct
      });
    } catch (error) {
      console.log('Error editing product', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  export default edit;