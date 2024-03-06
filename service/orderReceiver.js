const emitter = require("./emitter.js");
const orderController = require('../controllers/orderController');

function setupReceiver() {
    emitter.on('checkout', async (receivedEventData, callback)=>{
        try {
            // Call the order service
            const result = orderController.placeCartOrder(receivedEventData.cart, receivedEventData.address, receivedEventData.orderState);
            
            callback(result);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    });
}

module.exports = setupReceiver;