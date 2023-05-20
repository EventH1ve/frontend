import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaTicketAlt, FaExclamationTriangle } from "react-icons/fa";
import Seats from "./Seats";
import axios from "axios";

function BuyingBox({ eventData }) {
    const [event, setEvent] = useState(JSON.parse(eventData));
    const [showBooking, setShowBooking] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [counters, setCounters] = useState(event.tickets.map(() => 0));
    const [seats, setSeats] = useState(event.tickets.map(() => []));
    const { status, data } = useSession();
    console.log(eventData);

    const handleIncrement = (index) => {
        setCounters((prevCounters) => {
            const newCounters = [...prevCounters];
            newCounters[index] = newCounters[index] + 1;
            return newCounters;
        });
    };




    const handleDecrement = (index) => {
        if (counters[index] > 0) {
            setCounters((prevCounters) => {
                const newCounters = [...prevCounters];
                newCounters[index] = newCounters[index] - 1;
                return newCounters;
            });
        }
    };



    const switchToBookings = (index) => {
        setSelectedTicket(index);
        setShowBooking(true);
    };

    const handleSetSeats = (index, value) => {

        setSeats((prevSeats) => {
            const newSeats = [...prevSeats];
            newSeats[index] = value;
            return newSeats;
        });
        setCounters((prevCounters) => {
            const newCounters = [...prevCounters];
            newCounters[index] = value.length;
            return newCounters;
        });
        setShowBooking(false);
    };

    async function handleCheckout() {
        const selectedTickets = event.tickets;

        let ticketArr = []

        const ticketsJson = selectedTickets.map((ticket, index) => {
            const selectedSeats = seats[index];
            const Seated = ticket.Seated;
            const ticketCounter = counters[index];
            
            if (ticketCounter > 0) {
                let productObj = {
                    price_data: {
                        unit_amount: ticket.price * 100, 
                        currency: "egp",
                        product_data: {
                            name: `${ticket.name} tickets for ${event.name}`,
                        }
                    },
                    quantity: ticketCounter
                };
    
                ticketArr.push(productObj);  
            }          

            return {
                ticket_type: ticket.name,
                Seated: Seated,
                count: ticketCounter,
                seats: selectedSeats,
            };
        });

        const payload = {
            eventid: event.id,
            tickets: JSON.stringify(ticketsJson),
            token: data.user.token
        };

        console.log(ticketArr)

        let lineItems = {
            lineItems: ticketArr,
            metadata: payload
        };

        const res = await axios.post("/api/checkout", lineItems);
        window.location.href = res.data.session.url;
    }




    if (showBooking) {
        return (
            <Seats selectedTicket={selectedTicket} seatsGrid={event.tickets[selectedTicket].seats} handleSetSeats={handleSetSeats} selected_Seats={seats[selectedTicket]} />
        )
    }

    return (
        <div className="mb-4 bg-white px-6 py-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 flex justify-center">
                Tickets
            </h3>
            <ul className="text-gray-600">
                {event.tickets.map((item, index) => {
                    if (item.Available && !item.seated) {
                        return (
                            <li
                                key={index}
                                className="grid grid-cols-3 gap-2 h-20 py-1 rounded-md p-4 mb-2 hover:shadow-md items-center"
                            >
                                <div className="flex items-center gap-2 col-span-1">
                                    <FaTicketAlt className="text-[color:var(--darker-secondary-color)] text-2xl" />
                                    <span>{item.name}</span>
                                </div>
                                <div className="col-span-1 flex items-center justify-center gap-2">
                                    <button
                                        className="bg-gray-400 rounded-full text-white px-2 py-1 "
                                        onClick={() => handleDecrement(index)}
                                    >
                                        -
                                    </button>
                                    <span className="px-2 py-1">{counters[index]}</span>
                                    <button
                                        className="bg-gray-400 rounded-full text-white px-2 py-1 "
                                        onClick={() => handleIncrement(index)}
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="col-span-1 text-center text-l align-end">
                                    {counters[index] === 0 ? "0 EGP" : `${counters[index]}x${item.price} = ${counters[index] * item.price} EGP`}
                                </span>

                            </li>
                        );
                    } if (!item.Available) {
                        return (
                            <li
                                key={index}
                                className="grid grid-cols-3 items-center h-16 py-1 rounded-md p-4 gap-2 mb-2 hover:shadow-md"
                            >
                                <div className="flex items-center gap-2 col-span-1">
                                    <FaTicketAlt className="text-[color:var(--darker-secondary-color)] text-2xl" />
                                    <span>{item.name}</span>
                                </div>
                                <span className="text-center text-bold text-xl text-[color:var(--darker-secondary-color)] col-span-1">
                                    [Sold Out]
                                </span>
                            </li>
                        );
                    } else if (item.Available && item.seated) {
                        return (
                            <li
                                key={index}
                                className="grid grid-cols-3 items-center h-16 py-1 rounded-md p-4 gap-2 mb-2 hover:shadow-md"
                            >
                                <div className="flex items-center gap-2 col-span-1">
                                    <FaTicketAlt className="text-[color:var(--darker-secondary-color)] text-2xl" />
                                    <span>{item.name}</span>
                                </div>
                                <button className="px-6 py-2 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white rounded focus:outline-none" onClick={() => switchToBookings(index)}>
                                    Seats
                                </button>
                                <span className="col-span-1 text-center text-l align-end">
                                    {counters[index] === 0 ? "0 EGP" : `${counters[index]}x${item.price} = ${counters[index] * item.price} EGP`}
                                </span>
                            </li>
                        );
                    }


                })}
            </ul>

            <div className="mt-4 shadow-md p-4 ">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 text-sm">Total cost:</span>
                    <span className="text-gray-800 text-lg font-medium">
                        {event.tickets.reduce(
                            (acc, item, index) => acc + counters[index] * item.price,
                            0
                        )}{" "}
                        EGP
                    </span>
                </div>
                <button
                    className={`${status === "authenticated"
                        ? "bg-[color:var(--darker-secondary-color)]"
                        : "bg-gray-400 cursor-not-allowed"
                        } py-2 px-4 rounded-md text-white font-medium hover:bg-[color:var(--secondary-color)] focus:outline-none`}
                    disabled={status !== "authenticated" || status === "loading"}
                    onClick={handleCheckout}
                >
                    {status === "loading" ? "Processing..." : status === "authenticated" ? "Checkout" : "Please sign in to checkout"}
                </button>
            </div>


            <span className="text-sm text-[color:var(--darker-secondary-color)] mt-6 flex gap-2">
                <FaExclamationTriangle />
                Caution: All ticket sales are final and non-refundable.
            </span>
        </div>
    );
}

export default BuyingBox;
