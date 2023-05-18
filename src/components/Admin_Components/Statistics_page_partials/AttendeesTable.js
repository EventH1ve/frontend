import { useState } from 'react';
import { FaCircle, FaCheckCircle, FaTimes } from 'react-icons/fa';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";

import AttendeesPopup from './AttendeesPopup';

const AttendeesTable = ({ att }) => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    console.log(att)

    const [attendees, setattendees] = useState(att);

    const handleTransactionClick = (attendeeID) => {
        // do something when attendee id is clicked
    };

    return (
        <div className="bg-white p-4 m-2 md:m-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
                <p className="mb-2 text-3xl text-gray-500">Attendees</p>
                <button
                    className="bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white font-bold py-2 px-4 rounded-full"
                    onClick={togglePopup}
                >
                    See All..
                </button>
                <Popup
          open={isOpen}
          onClose={closePopup}
          modal
          closeOnDocumentClick
          contentStyle={{ maxWidth: "1500px", padding: "0rem", borderRadius: "20px", width: "85%" ,maxHeight: "95%", overflow: "auto"}}
          className="center-popup"
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-28px" }}>
            <button className="m-3 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white font-bold py-2 px-2 rounded-full"
              onClick={togglePopup}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <AttendeesPopup attendees={attendees} />       
          </Popup>
            </div>

            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Username</th>
                            <th className="py-3 px-6 text-center">Name</th>
                            <th className="py-3 px-6 text-center">Ticket Type</th>
                            <th className="py-3 px-6 text-left">Status</th>
                            <th className="py-3 px-6 text-center">Created At</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {attendees.slice(0, 5).map((attendee) => (
                            <tr key={attendee.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-center">{attendee.username}</td>
                                <td className="py-3 px-6 text-center">{attendee.name}</td>
                                <td className="py-3 px-6 text-center">{attendee.ticketType}</td>
                                <td className="py-3 px-6 text-center">
                                    {attendee.status === 'pending' && (
                                        <div className="flex items-center ">
                                            <FaCircle size={16} className="text-yellow-500 mr-2" />
                                            <span className="text-yellow-500 font-bold text-center">Pending</span>
                                        </div>
                                    )}
                                    {attendee.status === 'paid' && (
                                        <div className="flex items-center ">
                                            <FaCheckCircle size={16} className="text-green-500 mr-2" />
                                            <span className="text-green-500 font-bold text-center">Paid</span>
                                        </div>
                                    )}
                                    {attendee.status === 'attended' && (
                                        <div className="flex items-center r">
                                            <FaCheckCircle size={16} className="text-blue-500 mr-1" />
                                            <span className="text-blue-500 font-semibold text-center">Attended</span>
                                        </div>
                                    )}
                                </td>
                                <td className="py-3 px-6 text-center cursor-pointer ">
                                    <span className="mr-1 text-center">{attendee.createdat}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default AttendeesTable;