import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { FaSearchengin } from "react-icons/fa";


function UpComingPopUp({ UpcomingEvents }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredEvents = UpcomingEvents.filter(event => {
        return event.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <div className="bg-white p-4 m-8 rounded-lg shadow-md">
                <div className="flex justify-between mb-2">
                    <p className="mb-2 text-3xl text-gray-500">History</p>
                    <div className="flex justify-end p-2">
                        <TextField
                            label="Search Events"
                            sx={TextFieldStyle}
                            variant="outlined"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by Event Name"
                            InputProps={{
                                endAdornment: <FaSearchengin size={24} />,
                            }}
                        />
                    </div>
                </div>

                <div className="bg-white shadow-md rounded my-6 overflow-x-auto">

                    <table className="min-w-max w-full table-auto">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Event</th>
                                <th className="py-3 px-6 text-left">Venue</th>
                                <th className="py-3 px-6 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {filteredEvents.map((event) => (
                                <tr key={event.event_id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{event.name}</td>
                                    <td className="py-3 px-6 text-left">{event.venue}</td>
                                    <td className="py-3 px-6 text-left">{event.date}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
const TextFieldStyle =
{
    "& .MuiOutlinedInput-root": {

        "&.Mui-focused fieldset": { borderColor: "var(--darker-secondary-color)" },
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
        color: "var(--gray-color  )"
    }
}

export default UpComingPopUp;

