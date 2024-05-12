import Product from "../../models/productModel.js";
import { Request, Response } from 'express';

const edit = async (req: Request, res: Response) => {
    try {
      let productId = req.query.id;
      let name: string = req.body.name;
      let price: number = parseInt(req.body.price);
      let description: string = req.body.description;
      let tags: string[] = req.body.tags;

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