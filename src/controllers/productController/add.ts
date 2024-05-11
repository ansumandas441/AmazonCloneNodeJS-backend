import Product from "../../models/productModel.js";
import { Request, Response } from 'express';

const add = async (req: Request, res: Response) => {
    try {
      let name: string | null = 'name' in req.body ? req.body.name as string : null;
      let price: string | null = 'price' in req.body ? req.body.price as string : null;
      let description: string | null = 'description' in req.body ? req.body.description as string : null;
      let tags: string[] | null = 'tags' in req.body ? req.body.tags as string[] : null;

      if (!name || !price) {
        return res.status(400).json({
          error: "Name and price are required fields"
        });
      }
      const existingProduct = await Product.findOne({
        name: name,
        price: price
      });
      if (existingProduct) {
        return res.status(409).json({
          message: "Product already present"
        });
      }
      const newProduct = new Product({
        name,
        price,
        description,
        tags
      });
      //save product to a new database
      const savedProduct = await newProduct.save();
      if (!savedProduct) {
        return res.status(404).json({
          error: "Could not add product"
        });
      }
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error adding product', error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  export default add;