const Product = require("../models/productModel");

const addProduct = async (req, res) => {
    try {
        const {name, price} = req.body;
        const newProduct = new Product({name, price});

        //save product to a new database
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);

    } catch (error){
        console.error('Error adding product', error);
        res.status(500).json({"Internal server error"});
    }
};

const getProductByName = (req, res)=>{
    const productName = parseString(req.params.name);
    const product = await Product.findOne({name: productName})

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
} 

module.exports = {
  addProduct,
  getProductByName,
}