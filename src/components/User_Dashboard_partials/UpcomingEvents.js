import { useState, useEffect } from 'react';

import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import UpComingPopUp from './UpComingPopUp';
import { FaTimes } from "react-icons/fa";

const UpcomingEvents = ({ UpcomingEvents }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
  };


  return (
    <div className="bg-white p-4 mt-4 md:m-8 rounded-lg shadow-md">
      <div className="flex justify-between mb-2">
        <p className="mb-2 text-3xl text-gray-500">Upcoming</p>
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
          contentStyle={{ maxWidth: "1500px", padding: "0rem", borderRadius: "20px", width: "85%" }}
          className="center-popup"
        >
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-28px" }}>
            <button className="m-3 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white font-bold py-2 px-2 rounded-full"
              onClick={togglePopup}
            >
              <FaTimes size={24} />
            </button>
          </div>
          <UpComingPopUp UpcomingEvents={UpcomingEvents} />
        </Popup>


      </div>
      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Event</th>
              <th className="py-3 px-6 text-left">Venue</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Ticket Type</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Transaction ID</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {UpcomingEvents.length >= 5 ? (
              UpcomingEvents.slice(0, 5).map((event) => (
                <tr key={event.event_id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{event.name}</td>
                  <td className="py-3 px-6 text-left">{event.venue}</td>
                  <td className="py-3 px-6 text-left">{event.date}</td>
                  <td className="py-3 px-6 text-left">{event.tickettype}</td>
                  <td className="py-3 px-6 text-left">{event.price}</td>
                  <td className={`py-3 px-6 text-left ${event.status === "Paid" ? "text-green-600" : event.status === "Pending" ? "text-yellow-600" : ""}`}>{event.status}</td>
                  <td className="py-3 px-6 text-left">{event.transactionid}</td>
                </tr>
              ))
            ) : (
              UpcomingEvents.map((event) => (
                <tr key={event.event_id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{event.name}</td>
                  <td className="py-3 px-6 text-left">{event.venue}</td>
                  <td className="py-3 px-6 text-left">{event.date}</td>
                  <td className="py-3 px-6 text-left">{event.tickettype}</td>
                  <td className="py-3 px-6 text-left">{event.price}</td>
                  <td className={`py-3 px-6 text-left ${event.status === "Paid" ? "text-green-600" : event.status === "Pending" ? "text-yellow-600" : ""}`}>{event.status}</td>
                  <td className="py-3 px-6 text-left">{event.transactionid}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingEvents;
