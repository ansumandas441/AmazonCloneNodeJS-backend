import Cart from '../../models/cartModel.js';
import { Request, Response } from 'express';
import MyJwtPayload from '../../shared/MyJwtPayload.js';

const price = async (req: Request, res: Response) => {
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
        const cart = await Cart.findOne({
            email
        });
        if (!cart){
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
    } catch (error) {
        console.log("Error processing the deleting the cart", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export default price;