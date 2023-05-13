import { useEffect, useState } from "react";

const handleCheckout = async () => {
    let lineItems = {
        lineItems: [
            {
                price_data: {
                    unit_amount: 2000,
                    currency: "egp",
                    product_data: {
                        name: "Event Name;1",
                    }
                },
                quantity: 1
            }
        ]
    };
    const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(lineItems)
    });
    const b = await res.json();
    console.log(b)
    window.location.href = b.session.url;
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