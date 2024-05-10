import Cart from '../models/cartModel';
import Product from '../models/productModel';
import OrderStates from '../models/orderStates';
const cartController = {
    addToCart: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(404).json({
                    message: 'No user found for this cart'
                });
            }
            let existingUser = req.user;
            let email = existingUser.email;
            const productId = req.body.productId;
            const quantity = Number.parseInt(req.body.quantity);
            if (!email)
                return res.status(401).json({
                    error: "No email id provied"
                });
            if (quantity < 0) {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid request"
                });
            }
            const existingCart = await Cart.findOne({
                email
            });
            const product = await Product.find({
                _id: productId
            });
            if (!product || product.length === 0) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            let productPrice = product[0].price;
            const totalPrice = productPrice * quantity;
            const cartData = {
                email: email,
                products: [{
                        productId: productId,
                        name: product[0].name,
                        price: productPrice,
                        total: totalPrice,
                        quantity: quantity
                    }],
                subTotalPrice: totalPrice
            };
            if (existingCart) {
                let indexFound = existingCart.products.findIndex(p => p.productId == productId);
                if (indexFound !== -1) {
                    return res.status(400).json({
                        code: 400,
                        message: "Product Already exists. Could not create new cart"
                    });
                }
                else {
                    existingCart.products.push(cartData.products[0]);
                    existingCart.subTotalPrice = existingCart.products.map(item => item.total).reduce((acc, curr) => acc + curr);
                    let data = await existingCart.save();
                    return res.status(200).json({
                        message: "Success",
                        data: data
                    });
                }
            }
            let data = Cart.create(cartData);
            res.status(200).json({
                message: "Success",
                data: data
            });
        }
        catch (error) {
            console.log("Error processing the add/update method", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    updateCart: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(404).json({
                    message: 'No user found for this cart'
                });
            }
            let existingUser = req.user;
            const email = existingUser.email;
            const productId = req.body.productId;
            const quantity = Number.parseInt(req.body.quantity);
            if (!email)
                return res.status(401).json({
                    error: "No email id provied"
                });
            if (quantity < 0) {
                return res.status(400).json({
                    code: 400,
                    message: "Invalid request"
                });
            }
            const cart = await Cart.findOne({
                email
            });
            if (!cart) {
                return res.status(404).json({
                    code: 404,
                    message: "Cart cound not be found",
                });
            }
            const product = await Product.find({
                _id: productId
            });
            if (!product || product.length === 0) {
                return res.status(404).json({
                    message: "Product not found",
                    productId
                });
            }
            const productPrice = product[0].price;
            if (productPrice < 0) {
                // If quantity or price is negative(database error)
                return res.status(400).json({
                    code: 400,
                    message: "Invalid request"
                });
            }
            // If the cart doesn't exist, create a new one
            // cart = await Cart.create({ email, products: {} });
            let indexFound = cart.products.findIndex(p => p.productId == productId);
            if (indexFound === -1) {
                return res.status(400).json({
                    type: "failure",
                    mgs: "Process Failed, this product does not exist in this cart for editing",
                });
            }
            cart.email = email;
            cart.products[indexFound].quantity = quantity;
            cart.products[indexFound].name = product[0].name;
            cart.products[indexFound].price = productPrice;
            cart.products[indexFound].total = quantity * productPrice;
            cart.subTotalPrice = cart.products.map(item => item.total).reduce((acc, curr) => acc + curr);
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Process Successful",
                data: data
            });
        }
        catch (error) {
            console.log("Error processing the add method", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    deleteFromCart: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(404).json({
                    message: 'No user found for this cart'
                });
            }
            let existingUser = req.user;
            const email = existingUser.email;
            const productId = req.body.productId;
            if (!email)
                return res.status(401).json({
                    error: "No email id provied"
                });
            const cart = await Cart.findOne({
                email
            });
            if (!cart) {
                return res.status(404).json({
                    code: 404,
                    message: "Cart cound not be found",
                });
            }
            cart.products = cart.products.filter(product => product.productId != productId);
            cart.subTotalPrice = cart.products.map(item => item.total).reduce((acc, cur) => acc + cur);
            await cart.save();
            res.status(200).json({
                message: "Success"
            });
        }
        catch (error) {
            console.log("Error processing the deleting items from the cart", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    deleteCart: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(404).json({
                    message: 'No user found for this cart'
                });
            }
            let existingUser = req.user;
            const email = existingUser.email;
            if (!email)
                return res.status(401).json({
                    error: "No email id provied"
                });
            await Cart.findOneAndDelete({
                email: email
            });
            res.status(200).json({
                message: "Success"
            });
        }
        catch (error) {
            console.log("Error processing the deleting the cart", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    viewCart: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(404).json({
                    message: 'No user found for this cart'
                });
            }
            let existingUser = req.user;
            const email = existingUser.email;
            if (!email)
                return res.status(401).json({
                    error: "No email id provied"
                });
            const cart = await Cart.findOne({
                email
            });
            if (!cart) {
                return res.status(404).json({
                    error: "No cart found with this email id"
                });
            }
            res.status(200).json({
                cart: cart,
                totalPrice: cart.subTotalPrice
            });
        }
        catch (error) {
            console.log("Error processing the getting the cart", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
    calculatePrice: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(404).json({
                    message: 'No user found for this cart'
                });
            }
            let existingUser = req.user;
            const email = existingUser.email;
            if (!email)
                return res.status(401).json({
                    error: "No email id provied"
                });
            const cart = await Cart.findOne({
                email
            });
            if (!cart) {
                return res.status(404).json({
                    error: "No cart found with this email id"
                });
            }
            const totalPrice = Array.from(cart.products?.values()).reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
            res.status(200).json({
                TotalPrice: totalPrice
            });
        }
        catch (error) {
            console.log("Error processing the deleting the cart", error);
            res.status(500).json({
                message: "Internal server error",
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
            if (!req.user) {
                return res.status(404).json({
                    message: 'No user found for this cart'
                });
            }
            let existingUser = req.user;
            const email = existingUser.email;
            const { address } = req.body;
            if (!email)
                return res.status(401).json({
                    error: "No email id provied"
                });
            const cart = await Cart.findOne({
                email
            });
            // Emit an event indicating checkout has occurred
            const orderState = OrderStates.INITIATED;
            const eventData = {
                cart: cart,
                address: address,
                orderState: orderState
            };
        }
        catch (error) {
            console.log("Error processing the deleting the cart", error);
            res.status(500).json({
                message: "Internal server error",
            });
        }
    },
};
export default cartController;
