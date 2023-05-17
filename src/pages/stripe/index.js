import { getSession } from 'next-auth/react';
import axios from "axios";

const handleCheckout = async () => {
    const authSession = await getSession();

    let lineItems = {
        lineItems: [
            {
                price_data: {
                    unit_amount: 2000,
                    currency: "egp",
                    product_data: {
                        name: "Event Name",
                    }
                },
                quantity: 1
            }
        ],
        metadata: {
            eventId: 1,
            ticketType: "VIP",
            token: authSession.user.token
        }
    };

    const res = await axios.post("/api/checkout", lineItems);
    window.location.href = res.data.session.url;
}

function StripePage() {
    return (
        <>
            <div>
                <h1>Hello</h1>
                <button onClick={handleCheckout}>Checkout</button>

            </div>
        </>
    )
}

export default StripePage;