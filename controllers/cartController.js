const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const productController = {
    addOrUpdateToCart: async (req, res) => {
        try {
            const email = req.user.email;
            const productId = req.body.productId;
            const quantity = Number.parseInt(req.body.quantity);
            if (!email) return res.status(401).json({
                error: "No email id provied"
            });
            if (quantity < 0) {
                // If quantity or price is negative(database error)
                return res.status(400).json({
                    code: 400,
                    message: "Invalid request"
                })
            }
            const cart = await Cart.findOne({
                email
            });
            const product = await Product.find({
                _id: productId
            });
            const productPrice = product[0].price;
            if (productPrice < 0) {
                // If quantity or price is negative(database error)
                return res.status(400).json({
                    code: 400,
                    message: "Invalid request"
                })
            }
            if (!product) {
                res.status(400).json({
                    message: "Product not found"
                });
            }
            if (quantity < 0) {
                // If quantity or price is negative(database error)
                return res.status(400).json({
                    code: 400,
                    message: "Invalid request"
                })
            }
            if (cart) {
                // If the cart doesn't exist, create a new one
                // cart = await Cart.create({ email, products: {} });
                let indexFound = cart.products.findIndex(p => p.productId == productId);
                console.log("Index", indexFound)
                console.log("Cart = ",cart);

                if (indexFound !== -1) {
                    cart.email = email;
                    cart.products[indexFound].quantity = quantity;
                    cart.products[indexFound].name = product[0].name;
                    cart.products[indexFound].price = productPrice;
                    cart.products[indexFound].total = quantity * productPrice;
                    cart.subTotalPrice = cart.products.map(item => item.total).reduce((acc, curr) => acc + curr);
                } else {
                    cart.products.push({
                        productId: productId,
                        name: product.name,
                        quantity: quantity,
                        price: productPrice,
                        total: parseInt(productPrice * quantity).toFixed(2),
                    })
                    cart.subTotalPrice = cart.products.map(item => item.total).reduce((acc, curr) => acc + curr);
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process Successful",
                    data: data
                })
            } else {
                const cartData = {
                    email: email,
                    products: [{
                        productId: productId,
                        name: product[0].name,
                        price: productPrice,
                        total: parseInt(productPrice * quantity),
                        quantity: quantity
                    }],
                    subTotal: parseInt(productPrice * quantity)
                };
                cart = new Cart(cartData);
                //-----------------------------------------------------------------
                // const nameTest = product[0].name;
                // const total = parseInt(productPrice*quantity);
                // console.log("productIdTest = "+typeof(productId)+productId);
                // console.log("nameTest = "+typeof(nameTest)+nameTest);
                // console.log("productPriceTest = "+typeof(parseInt(productPrice))+parseInt(productPrice));
                // console.log("totalTest = "+typeof(total)+total);
                // console.log("quantityTest = "+typeof(quantity) + quantity);
                // console.log("Product print",product); 
                // const products = [{
                //     productId: productId,
                //     name: product.name,
                //     price: productPrice,
                //     total: parseInt(productPrice * quantity),
                //     quantity: quantity
                // }];
                // const subTotal = parseInt(productPrice * quantity);
                
                // const newCart = new Cart({email, products, subTotal});
                let data = await cart.save();
                console.log({
                    message: "Item added to the cart"
                });
                res.status(200).json({
                    message: "Success",
                    data: data
                });
            }
        } catch (error) {
            console.log("Error processing the add/update method", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    },

    deleteFromCart: async (req, res) => {
        try {
            const email = req.user.email;
            const {
                productId
            } = req.body.quantity;
            if (!email) return res.status(401).json({
                error: "No email id provied"
            });
            const cart = await Cart.findOne({
                email
            });
            cart.products = cart.products.filter(product => product.productId != productId)
            await cart.save();
            console.log({
                message: "Product deleted successfully"
            });
            res.status(200).json({
                message: "Success"
            });
        } catch (error) {
            console.log("Error processing the deleting items from the cart", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    },

    deleteCart: async (req, res) => {
        try {
            const email = req.user.email;
            if (!email) return res.status(401).json({
                error: "No email id provied"
            });
            await Cart.findByIdAndDelete({
                email
            });
            console.log({
                message: "Cart deleted successfully"
            });
            res.status(200).json({
                message: "Success"
            });
        } catch (error) {
            console.log("Error processing the deleting the cart", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    },

    viewCart: async (req, res) => {
        try {
            const email = req.user.email;
            if (!email) return res.status(401).json({
                error: "No email id provied"
            });
            const cart = await Cart.find({
                email
            });
            if (!cart) return res.status(400).json({
                error: "No cart found with this email id"
            });
            const totalPrice = Array.from(cart.products ?.values()).reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            res.status(200).json({
                cart: cart,
                totalPrice: totalPrice
            });
        } catch (error) {
            console.log("Error processing the deleting the cart", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    },

    calculatePrice: async (req, res) => {
        try {
            const email = req.user.email;
            if (!email) return res.status(401).json({
                error: "No email id provied"
            });
            const cart = await Cart.findOne({
                email
            });
            const totalPrice = Array.from(cart.products ?.values()).reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            res.status(200).json({
                TotalPrice: totalPrice
            });
        } catch (error) {
            console.log("Error processing the deleting the cart", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    },

    // const useCoupon = async (re,res) => {
    //     try {
    //         const couponCode = req.body.couponCode;

    //         const totalPrice = await calculatePrice();

    //     } catch (error) {

    //     }
    // }

    checkoutCart: async (req, res) => {
        try {
            const email = req.user.email;
            if (!email) return res.status(401).json({
                error: "No email id provied"
            });
            const cart = await Cart.findOne({
                email
            });

        } catch (error) {
            console.log("Error processing the deleting the cart", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    }
}

module.exports = productController
