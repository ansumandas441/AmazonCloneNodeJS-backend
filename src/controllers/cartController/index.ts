import add from './add.js';
import update from './update.js';
import { deleteAllCart, deleteElement } from './delete.js';
import view from './view.js';
import price from './price.js';
import checkout from './checkout.js';

const cartController = {
    addToCart: add,
    updateCart: update,
    deleteFromCart: deleteElement,
    deleteCart: deleteAllCart,
    viewCart: view,
    calculatePrice: price,
    checkoutCart: checkout

    // const useCoupon = async (re,res) => {
    //     try {
    //         const couponCode = req.body.couponCode;

    //         const totalPrice = await calculatePrice();

    //     } catch (error) {

    //     }
    // }

    
}

export default cartController;