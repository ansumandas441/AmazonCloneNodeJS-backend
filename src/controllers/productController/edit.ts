import { Request, Response } from 'express';

import Product from '../../models/productModel.js';

const edit = async (req: Request, res: Response) => {
  try {
    const productId = req.query.id;
    const name: string = req.body.name;
    const price: number = parseInt(req.body.price);
    const description: string = req.body.description;
    const tags: string[] = req.body.tags;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId, {
        name,
        price,
        description,
        tags,
      }, {
        new: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }
    console.log({
      message: 'Product details edited successfully',
    });
    res.status(200).json({
      updatedProduct,
    });
  } catch (error) {
    console.log('Error editing product', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export default edit;