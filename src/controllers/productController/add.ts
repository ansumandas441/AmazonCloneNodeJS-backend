import Product from "../../models/productModel.js";
import { Request, Response } from 'express';

const add = async (req: Request, res: Response) => {
    try {
      let name: string = req.body.name;
      let price: number = parseInt(req.body.price);
      let description: string = req.body.description;
      let tags: string[] = req.body.tags;
      
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