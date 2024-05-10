import Product from "../models/productModel.js";
import { Request, Response } from 'express';

const productController = {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      let page: number = 'page' in req.query ? parseInt(req.query.page as string, 10) : 1;
      let limit: number = 'limit' in req.query ? parseInt(req.query.limit as string, 10) : 10;
      let sortField: string = 'sortField' in req.query ? req.query.sortField as string : 'price';
      let sortOrder: string = 'sortOrder' in req.query ? req.query.sortOrder as string : 'asc';

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
  },
  addProduct: async (req: Request, res: Response) => {
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
  },
  getProductById: async (req: Request, res: Response) => {
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
  },
  getProductByName: async (req: Request, res: Response) => {
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
  },
  editPrice: async (req: Request, res: Response) => {
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
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
      let productId: string | null = 'id' in req.query ? req.query.id as string : null;
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
  },
  searchProduct: async (req: Request, res: Response) => {
    try {
      let name: string | null = 'name' in req.query ? req.query.name as string : null;
      if(!name){
        return res.status(400).json({
          message: 'Bad request'
        })
      }
      //regular expression for searching in the database
      const regex = new RegExp(name, 'i');
      const products = await Product.find({
        $or: [{
            name: regex
          },
          {
            description: regex
          },
          {
            tags: regex
          },
        ],
      });
      if (products.length === 0) {
        return res.status(404).json({});
      }
      const transformedProducts = products.map(product => ({
        _id: product._id,
        name: product.name,
        description: product.description,
      }));

      res.status(200).json(transformedProducts);

    } catch (error) {
      console.log('Error deleting the product', error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}

export default productController;