import Product from "../models/productModel";
const productController = {
    getAllProducts: async (req, res) => {
        try {
            let page = 'page' in req.query ? parseInt(req.query.page, 10) : 1;
            let limit = 'limit' in req.query ? parseInt(req.query.limit, 10) : 10;
            let sortField = 'sortField' in req.query ? req.query.sortField : 'price';
            let sortOrder = 'sortOrder' in req.query ? req.query.sortOrder : 'asc';
            const products = await Product.aggregate([
                {
                    $sort: { sortField: sortOrder === 'asc' ? 1 : -1 }
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
        }
        catch (error) {
            console.log('Fetch Error All products: ', error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    addProduct: async (req, res) => {
        try {
            let name = 'name' in req.body ? req.body.name : null;
            let price = 'price' in req.body ? req.body.name : null;
            let description = 'description' in req.body ? req.body.name : null;
            let tags = 'tag' in req.body ? req.body.tag : null;
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
        }
        catch (error) {
            console.error('Error adding product', error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    getProductById: async (req, res) => {
        try {
            let productId = 'id' in req.query ? req.query.id : null;
            if (!productId) {
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
        }
        catch (error) {
            console.log('Error finding the product by id');
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    getProductByName: async (req, res) => {
        try {
            let productName = 'name' in req.query ? req.query.name : null;
            if (!productName) {
                return res.status(400).json({
                    error: "Product Name is required field, Bad request"
                });
            }
            const products = await Product.find({
                name: productName
            });
            if (products.length > 0) {
                res.status(200).json(products);
            }
            else {
                res.status(404).json({
                    error: 'Product not found'
                });
            }
        }
        catch (error) {
            console.log("Error finding the product by it's name", error);
            res.status(501).json({
                message: "Internal server error",
            });
        }
    },
    editPrice: async (req, res) => {
        try {
            let productId = 'id' in req.query ? req.query.id : null;
            let name = 'name' in req.body ? req.body.name : null;
            let price = 'price' in req.body ? req.body.name : null;
            let description = 'description' in req.body ? req.body.name : null;
            let tags = 'tag' in req.body ? req.body.tag : null;
            if (!name || !price) {
                return res.status(400).json({
                    error: "Name and price are required fields"
                });
            }
            const updatedProduct = await Product.findByIdAndUpdate(productId, {
                name,
                price,
                description,
                tags
            }, {
                new: true
            });
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
        }
        catch (error) {
            console.log('Error editing product', error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            let productId = 'id' in req.query ? req.query.id : null;
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(404).json({
                    error: 'Product not found'
                });
            }
            res.status(200).json({
                message: 'Product deleted successfully'
            });
        }
        catch (error) {
            console.log('Error deleting the product', error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    searchProduct: async (req, res) => {
        try {
            let name = 'name' in req.query ? req.query.name : null;
            if (!name) {
                return res.status(400).json({
                    message: 'Bad request'
                });
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
        }
        catch (error) {
            console.log('Error deleting the product', error);
            res.status(500).json({
                message: 'Internal server error',
            });
        }
    }
};
export default productController;
