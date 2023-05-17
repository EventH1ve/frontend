import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";


const SuccessPage = () => {
    const [subtotal, setSubtotal] = useState();
    const [orderId, setOrderId] = useState();
    const [ticketURL, setTicketURL] = useState();
    const router = useRouter();
    const sessionId = router.query.session_id;

    useEffect(() => {
        const getSessionInfo = async () => {
            const sessionRes = await axios.get(`/api/sessions/${sessionId}`)
            const b = sessionRes.data

            const subtotal = b.session.amount_subtotal;
            const orderId = b.session.payment_intent.id;
            const eventId = b.session.metadata.eventid;
            const token = b.session.metadata.token;
            const tickets = b.session.metadata.tickets;

            console.log(eventId)

            setOrderId(orderId)
            setSubtotal(subtotal)

            const ticketRes = await axios.post('/api/ticket', {
                token: token,
                eventId,
                orderId,
                subtotal,
                tickets
            });
            
            const { qrURL } = ticketRes.data;
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
                <Link href={ticketURL}>Ticket QR Code</Link>
            </div>
        </>
    )
}

export default SuccessPage;