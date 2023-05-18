import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@mui/material";
import UserNavBar from "../../components/UserNavBar";
import Footer from "../../components/FooterComponent";
import OrderDetailsContainer from '../../components/payment_partials/OrderDetailsContainer';

const SuccessPage = () => {
    const [subtotal, setSubtotal] = useState();
    const [orderId, setOrderId] = useState();
    const [ticketURL, setTicketURL] = useState();
    const router = useRouter();
    const sessionId = router.query.session_id;

    useEffect(() => {
        const getSessionInfo = async () => {
            try {
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
                    subtotal: subtotal / 100, // Stripe sessions use cents
                    tickets
                });
                
                const { qrURL } = ticketRes.data;
                setTicketURL(qrURL)
            } catch (err) {
                console.log(err)
            }
        }
        getSessionInfo();
    }, []);

    return (
        <div className="bg-[color:var(--primary-color)]">
            <UserNavBar />
            <div className="flex flex-col items-center justify-center">
                <div className="container mt-4 bg-[color:var(--primary-color)]">
                    <div className="container">
                        <div className="grid grid-cols-1">
                            <OrderDetailsContainer subtotal={subtotal} orderId={orderId} ticketURL={ticketURL} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SuccessPage;