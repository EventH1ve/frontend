import Stripe from "stripe";

export default async function handler(req, res) {

    if (req.method != 'POST') {
        res.status(405).json({message: "POST method required"});
    }

    try {
        const {lineItems, metadata} = req.body;

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15"
        });

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            success_url: `http://34.125.23.115:3000/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://34.125.23.115:3000/users/home",
            line_items: lineItems,
            metadata: metadata
        });

        res.status(201).json({session});
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }

}