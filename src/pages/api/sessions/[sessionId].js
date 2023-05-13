import Stripe from "stripe";

export default async function handler(req, res) {

    if (req.method != 'GET') {
        res.status(405).json({message: "GET method required"});
    }

    try {
        const { sessionId } = req.query;

        if (!sessionId.startsWith('cs_')) {
            throw Error('Invalid session id');
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15"
        });

        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['payment_intent', 'line_items.data.price.product']
        });
        res.status(200).json({session});
    } catch (e) {
        res.status(500).json({message: e.message})
    }

}