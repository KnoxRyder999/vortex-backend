// routes/checkout.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { Service } = require('../db');

exports.order = async (req, res) => {

    const { serviceId } = req.body;

    try {
        const prod = await Service.findByPk(serviceId)
        const { name, price, description, photo, product } = prod

        const session = await stripe.checkout.sessions.create({
            // mode: 'payment',
            mode: 'subscription',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: price,
                        product_data: { name, description },
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                }
            ],
            success_url: process.env.YOUR_DOMAIN + '/download.html?product='+product,
            cancel_url: process.env.YOUR_DOMAIN + '/failed.html',//'/failed.html?',
        });
        res.json({ url: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};