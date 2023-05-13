import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from 'next-auth/react';
import axios from "axios";


const SuccessPage = () => {
    const [subtotal, setSubtotal] = useState();
    const [orderId, setOrderId] = useState();
    const [ticketURL, setTicketURL] = useState();
    const router = useRouter();
    const sessionId = router.query.session_id;
    // const authSession = useSession();

    useEffect(() => {
        const getSessionInfo = async () => {
            console.log("sessionID", sessionId)
            const res = await fetch(`/api/sessions/${sessionId}`, {
                method: "GET"
            });
            const b = await res.json();
            console.log(b);
            const subtotal = b.session.amount_subtotal;
            const orderId = b.session.payment_intent.id;
            let eventArr = b.session.line_items.data[0].description.split(';');
            const eventName = eventArr[0];
            const eventId = parseInt(eventArr[1]);
            console.log(eventName);
            console.log(eventId);

            setOrderId(orderId)
            setSubtotal(subtotal)
            let authSession  = await getSession();

            const tRes = await axios.post('/api/ticket', {
                token: authSession.user.token,
                eventId,
                orderId,
                subtotal
            });
            
            const { qrURL } = tRes.data;
            console.log(qrURL)
            setTicketURL(qrURL)
        }
        getSessionInfo();
    }, []);

    return (
        <>
            <div>
                <h1>Order Successful</h1>
                <h2>Order ID: {orderId}</h2>
                <h2>Subtotal: {subtotal}</h2>
                <h3>Ticket URL: {ticketURL}</h3>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession();
    console.log(session)
    

    return {
      props: {}, // will be passed to the page component as props
    };
  }

export default SuccessPage;