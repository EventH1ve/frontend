import Stripe from "stripe";

export default async function handler(req, res) {

    if (req.method != 'POST') {
        res.status(405).json({message: "POST method required"});
    }

    try {
        const body = JSON.parse(req.body).lineItems
        console.log(body)

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: "2022-11-15"
        });

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            success_url: `http://localhost:3000/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: "http://localhost:3000/stripe/",
            line_items: body
        });
        console.log(session);
        res.status(201).json({session});
    } catch (e) {
        res.status(500).json({message: e.message})
    }

}