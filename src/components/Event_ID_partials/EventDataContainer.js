import Popup from 'reactjs-popup';
import { useSession } from "next-auth/react";
import { useState, useEffect } from 'react';
import { FaTimes, } from "react-icons/fa";
import "reactjs-popup/dist/index.css";
import BuyingBox from './BuyingBox';

function EventDataContainer({ eventData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [eventData_string, setEventData_string] = useState("");

    const handleShare = () => {
        
        //take the event link and share it

    
    };
    
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    useEffect(() => {  
        setEventData_string(JSON.stringify(eventData));
        console.log(eventData_string);
    }, []);
    
    return (
        <div className="container bg-white py-4 mt-4 rounded-lg shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {eventData.name}
                        </h1>
                        <div className="flex flex-col md:flex-row">
                            <div className="text-md text-gray-800 mr-4">
                                <span className="font-bold">
                                    Date:
                                </span>{" "}
                                {eventData.date.split("T")[0]}
                            </div>
                            <div className="text-md text-gray-800 mr-4">
                                <span className="font-bold">
                                    Time:
                                </span>{" "}
                                {eventData.date.split("T")[1]}
                            </div>
                            <div className="text-md text-gray-800 mr-4">
                                <span className="font-bold">
                                    Venue:
                                </span>{" "}
                                {eventData.venue}
                            </div>
                            <div className="text-md text-gray-800 mr-4">
                                <span className="font-bold">
                                    Organizer:
                                </span>{" "}
                                {eventData.organizer}
                            </div>
                        </div>
                    </div>
                    <div className="text-left lg:text-right mt-4 lg:mt-0">
                        <button
                            onClick={togglePopup}
                            className="px-6 py-2 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white rounded focus:outline-none">
                            Buy Tickets
                        </button>
                    </div>
                </div>
                <div className="border-b border-gray-300 mt-8 mb-4"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Ticket Pricing starts from
                        </h3>
                        <p className="text-gray-800 text-lg">
                            {Math.min(...eventData.tickets.map(ticket => ticket.price))} EGP
                        </p>
                    </div>
                    <div className="flex mt-4 md:mt-0">
                        <button
                            className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>
            <Popup
                open={isOpen}
                onClose={closePopup}
                modal
                closeOnDocumentClick
                contentStyle={{ padding: "0rem", borderRadius: "20px", width: "fit-content", maxWidth: "95%", maxHeight: "95%", overflow: "auto" }}
                className="center-popup  "
            >
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-28px" }}>
                    <button className="m-3 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white font-bold py-2 px-2 rounded-full"
                        onClick={togglePopup}
                    >
                        <FaTimes size={24} />
                    </button>
                </div>
                <BuyingBox eventData={eventData_string} />
            </Popup>
        </div>



    );
}
export default EventDataContainer;