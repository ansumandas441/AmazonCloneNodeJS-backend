const emitter = require("./emitter.js");
const orderController = require('../controllers/orderController');

function setupReceiver() {
    emitter.on('checkout', async (receivedEventData, callback)=>{
        try {
            // Call the order service
            console.log(`TOKENX cart ${receivedEventData.cart}`);
            console.log(`TOKENX address ${receivedEventData.address}`);
            console.log(`TOKENX status ${receivedEventData.orderState}`);
            const result = orderController.placeCartOrder(receivedEventData.cart, receivedEventData.address, receivedEventData.orderState);
            
            callback(result);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    });
}

module.exports = setupReceiver;