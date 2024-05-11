import Product from "../../models/productModel.js";
import { Request, Response } from 'express';


const search = async (req: Request, res: Response) => {
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

export default search;