import Cart from '../../models/cartModel.js';
import Product from '../../models/productModel.js';
import { Request, Response } from 'express';
import MyJwtPayload from '../../shared/MyJwtPayload.js';

const add = async (req: Request, res: Response) => {
    try {
        if(!req.user){
            return res.status(404).json({
                message:'No user found for this cart'
            })
        }
        let existingUser = req.user as MyJwtPayload;
        let email: string = existingUser.email;
        const productId = req.body.productId;
        const quantity = Number.parseInt(req.body.quantity);
        if (!email) return res.status(401).json({
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
            } else {
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

    } catch (error) {
        console.log("Error processing the add/update method", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export default add;