const Cart = require('../models/cartModel');
const bcrypt = require('bcrypt');

const addOrUpdateToCart = async (req,res)=>{
    try {
        const email = req.user.email;
        const {quantity, productId} = req.body.quantity;
        if(!email) return res.status(401).json({error: "No email id provied"});
        const cart = await Cart.findOne({email});
        cart.items?.set(productId, {quantity});
        await cart.save();
        console.log({message:"Item added to the cart"});
        res.status(200).json({message: "Success"});
    } catch (error) {
        console.log("Error processing the add/update method", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const deleteFromCart = async (req,res) => {
    try {
        const email = req.user.email;
        const {quantity, productId} = req.body.quantity;
        if(!email) return res.status(401).json({error: "No email id provied"});
        const cart = await Cart.findByIdAndDelete({email});
        cart.items?.delete(productId);
        await cart.save();
        console.log({message:"Items deleted successfully"});
        res.status(200).json({message: "Success"});
    } catch (error) {
        console.log("Error processing the deleting items from the cart", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const deleteCart = async (req,res) => {
    try {
        const email = req.user.email;
        if(!email) return res.status(401).json({error: "No email id provied"});
        await Cart.findByIdAndDelete({email});
        console.log({message:"Cart deleted successfully"});
        res.status(200).json({message: "Success"});
    } catch (error) {
        console.log("Error processing the deleting the cart", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const viewCart = async (req,res) => {
    try {
        const email = req.user.email;
        if(!email) return res.status(401).json({error: "No email id provied"});
        const cart = await Cart.find({email});
        if(!cart) return res.status(400).json({error: "No cart found with this email id"});
        const totalPrice = Array.from(cart.items?.values()).reduce((total,item)=>{
            return total+item.price*item.quantity;
        },0);
        res.status(200).json({cart: cart, totalPrice: totalPrice});
    } catch (error) {
        console.log("Error processing the deleting the cart", error);
        res.status(500).json({error: "Internal server error"});
    }
}

const calculatePrice = async (req,res) => {
    try {
        const email = req.user.email;
        if(!email) return res.status(401).json({error: "No email id provied"});
        const cart = await Cart.findOne({email});
        const totalPrice = Array.from(cart.items?.values()).reduce((total,item)=>{
            return total+item.price*item.quantity;
        },0);
        res.status(200).json({TotalPrice: totalPrice});
    } catch (error) {
        console.log("Error processing the deleting the cart", error);
        res.status(500).json({error: "Internal server error"});
    }
}

// const useCoupon = async (re,res) => {
//     try {
//         const couponCode = req.body.couponCode;

//         const totalPrice = await calculatePrice();
        
//     } catch (error) {

//     }
// }

const checkoutCart = async (req,res) => {
    try {
        const email = req.user.email;
        if(!email) return res.status(401).json({error: "No email id provied"});
        const cart = await Cart.findOne({email});

    } catch (error) {
        console.log("Error processing the deleting the cart", error);
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    addOrUpdateToCart,
    deleteFromCart,
    deleteCart,
    viewCart,
    calculatePrice,
    checkoutCart,
}