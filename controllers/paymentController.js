const fs = require('fs');

const calculateTotalAmount = (items) => {
    return 100;
}

const paymentController = {
    handlePaymentIntent: async (req, res) => {
        try {
            const {
                items
            } = req.body;

            //calculating total price from the items
            const amount = calculateTotalAmount(items);

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'inr',
                automatic_payment_methods: {
                    enabled: true,
                    allow_redirects: 'never',
                },
                // confirm:true,
                // return_url: 'https://your-app.com/success'
            });
            console.log("PaymenyIntentId: ", paymentIntent.paym);
            res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id
            });

        } catch (error) {
            console.log("Error processing payment gateway", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    },
    handlePaymentConfirmation: async (req, res) => {
        try {
            const {
                paymentMethodId,
                paymentIntentId
            } = req.body;

            const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
                payment_method: paymentMethodId
            });
            if (!paymentIntent) {
                return res.status(400).json({
                    error: "Payment is failed"
                });
            }
            res.status(200).json({
                message: 'Payment confirmed successfully'
            });
        } catch (error) {
            console.log("Error processing payment confirmation", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    },
    paymentPage: async (req, res) => {
        try {
            fs.readFile('./scripts/stripeFormSubmission2.js', 'utf8', (err, scriptContent)=>{
                if (err) {
                    console.error('Error reading script file:', err);
                    res.status(500).send('Error reading script file');
                    return;
                }

                // Render the EJS file with injected JavaScript code
                res.render('form', {
                    scriptCode: scriptContent
                });
            });
            res.render('form', { title: 'Payment API' });
        } catch (error) {
            console.log("Error processing payment confirmation", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    },
    paymentIntent: async (req, res) => {
        try {
            console.log("TOKENX happened 2");
        } catch (error) {
            console.log("Error processing payment confirmation", error);
            res.status(500).json({
                error: "Internal server error",
                error
            });
        }
    }
}



module.exports = paymentController;