import Cart from '../../models/cartModel.js';
import { Request, Response } from 'express';
import MyJwtPayload from '../../shared/MyJwtPayload.js';

const deleteElement = async (req: Request, res: Response) => {
    try {
        if(!req.user){
            return res.status(404).json({
                message:'No user found for this cart'
            })
        }
        let existingUser = req.user as MyJwtPayload;
        const email = existingUser.email;
        const productId = req.body.productId;
        if (!email) return res.status(401).json({
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
    } catch (error) {
        console.log("Error processing the deleting items from the cart", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

const deleteAllCart = async (req: Request, res: Response) => {
    try {
        if(!req.user){
            return res.status(404).json({
                message:'No user found for this cart'
            })
        }
        let existingUser = req.user as MyJwtPayload;
        const email = existingUser.email;
        if (!email) return res.status(401).json({
            error: "No email id provied"
        });
        await Cart.findOneAndDelete({
            email: email
        });
        res.status(200).json({
            message: "Success"
        });
    } catch (error) {
        console.log("Error processing the deleting the cart", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export {deleteElement, deleteAllCart};