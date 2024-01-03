const Product = require("../models/productModel");

const productController = {
  getAllProducts: async (req,res)=> {
    try {
      const products = await Product.find();
      if (!products) {
        return res.status(300).json({message:"No products found"});
      }
      const transformedProduct = products.map(product => {
        return {
          _id:product._id,
          name:product.name,
          description:product.description,
          tags:product.tags,
        };
      });
      res.json(transformedProduct);
    } catch (error) {
      console.log('Fetch Error All products: ', error);
      res.status(500).json({error: 'Internal server error'});
    }
  },
  addProduct: async (req, res) => {
      try {
          const {name, price, description, tag} = req.body;
          if(!name || !price) {
            return res.status(400).json({error:"Name and price are required fields"});
          }
          console.log("name and price", name, price);
          const existingProduct = await Product.findOne({name:name, price:price});
          if(existingProduct) {
            return res.status(300).json({message:"Product already present"});
          }
          const newProduct = new Product({name, price, description, tag});
          //save product to a new database
          const savedProduct = await newProduct.save(newProduct);
          if (!savedProduct) {
            return res.status(404).json({error:"Could not add product"});
          }
          res.status(201).json(savedProduct);
      } catch (error){
          console.error('Error adding product', error);
          res.status(500).json({error: "Internal server error"});
      }
  },
  getProductById: async (req,res)=> {
    try {
      const productId = req.params.id;
      const product = await Product.findOne({_id:productId});
      if (!product) {
        return res.status(300).json({error:"No Products found by this id"});
      }
      res.status(200).json(product);
    } catch (error) {
      console.log('Error finding the product by id');
      res.status(500).json({error:"Internal server error"});
    }
  },
  getProductByName: async (req, res)=>{
    try {
      const productName = req.params.name;
      const products = await Product.find({name: productName})
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch(error) {
      console.log("Error finding the product by it's name", error);
      res.status(501).json({error: "Internal server error"});
    }
  },
  editPrice: async (req,res)=> {
    try {
      const productId = req.params.id;
      const {name, price, description, tags} = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { name, price, description, tags},
        {new: true}
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      console.log({message: 'Product details edited successfully'});
      res.status(200).json({updatedProduct});

    } catch(error) {
      console.log('Error editing product', error);
      res.status(500).json({error: 'Internal server error'});
    }
  },
  deleteProduct: async (req, res)=> {
    try {
      const productId = req.params.id;
      const deletedProduct = Product.findByIdAndDelete(
        productId
      );
      if (!deletedProduct) {
        return res.status(404).json({error: 'Product not found'});
      }
      res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
      console.log('Error deleting the product', error);
      res.status(500).json({error: 'Internal server error'});
    }
  }
}

module.exports = productController;