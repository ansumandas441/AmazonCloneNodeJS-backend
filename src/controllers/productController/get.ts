import Product from "../../models/productModel.js";
import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
    try {
      let page: number = parseInt(req.query.page as string) || 1;
      let limit: number = parseInt(req.query.limit as string) || 10;
      let sortField = req.query.sortField;
      let sortOrder = req.query.sortOrder;

      const products = await Product.aggregate([
        {
          $sort: {sortField: sortOrder === 'asc' ? 1 : -1}
        },
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        }
      ]);

      if (!products) {
        return res.status(404).json({
          message: "No products found"
        });
      }
      const transformedProduct = products.map(product => {
        return {
          _id: product._id,
          name: product.name,
          price: product.price,
          description: product.description,
          tags: product.tags,
        };
      });
      res.status(200).json(transformedProduct);
    } catch (error) {
      console.log('Fetch Error All products: ', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
};

const getById = async (req: Request, res: Response) => {
    try {
      let productId: string | null = 'id' in req.query ? req.query.id as string : null;
      if(!productId){
        return res.status(400).json({
          error: "ProductId is required field, Bad request"
        });
      }
      const product = await Product.findOne({
        _id: productId
      }).lean();
      if (!product) {
        return res.status(404).json({
          error: "No Products found by this id"
        });
      }
      res.status(200).json(product);
    } catch (error) {
      console.log('Error finding the product by id');
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

  const getByName = async (req: Request, res: Response) => {
    try {
      let productName: string | null = 'name' in req.query ? req.query.name as string : null;
      if(!productName){
        return res.status(400).json({
          error: "Product Name is required field, Bad request"
        });
      }
      const products = await Product.find({
        name: productName
      });
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json({
          error: 'Product not found'
        });
      }
    } catch (error) {
      console.log("Error finding the product by it's name", error);
      res.status(501).json({
        message: "Internal server error",
      });
    }
  };

  export {
    getAll,
    getById,
    getByName,
  }

