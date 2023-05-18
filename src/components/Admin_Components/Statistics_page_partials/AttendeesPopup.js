import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { FaSearchengin, FaCircle, FaCheckCircle, FaFileExcel } from "react-icons/fa";
import { CSVLink } from 'react-csv';

function AttendeesPopup({ attendees }) {
  const [searchTerm, setSearchTerm] = useState("");

  const headers = [
    { label: 'Username', key: 'username' },
    { label: 'Name', key: 'name' },
    { label: 'Ticket Type', key: 'ticketType' },
    { label: 'Status', key: 'status' },
    { label: 'Created At', key: 'createdat' },
  ];
  const csvData = attendees.map(({ id, ...rest }) => rest);

  const filterAttendees = attendees.filter(attendee => {
    return attendee.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  



  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="bg-white p-4 m-8 rounded-lg ">
        <div className="flex justify-between mb-2">
          <p className="mb-2 text-3xl text-gray-500">Attendees</p>
          <div className="flex justify-end p-2">
            <TextField
              label="Search Attendees"
              sx={TextFieldStyle}
              variant="outlined"
              type="text"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Search by Attendee Name"
              InputProps={{
                endAdornment: <FaSearchengin size={24} />,
              }}
            />

            <CSVLink
              data={csvData}
              headers={headers}
              filename={'attendees.csv'}
              className="ml-2"
              target="_blank"
            >

              <FaFileExcel size={53} className="text-green-800" />
            </CSVLink>
          </div>
        </div>

        <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Username</th>
                <th className="py-3 px-6 text-center">Name</th>
                <th className="py-3 px-6 text-center">No. of Tickets</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-center">Transaction ID</th>
                <th className="py-3 px-6 text-center">Created At</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">
              {filterAttendees.map((attendee) => (
                <tr key={attendee.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-center">{attendee.username}</td>
                  <td className="py-3 px-6 text-center">{attendee.name}</td>
                  <td className="py-3 px-6 text-center">{attendee.tickets}</td>
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
                  <td
                    className="py-3 px-6 text-center cursor-pointer "
                    onClick={() => handleTransactionClick(attendee.attendeeID)}
                  >
                    <span className="text-gray-500 font-semibold text-center">{attendee.attendeeID}</span>
                  </td>
                  <td className="py-3 px-6 text-center cursor-pointer ">
                    <span className="mr-1 text-center">{attendee.created_at}</span>
                  </td>
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
    color: "var(--gray-color)"
  }
}

export default AttendeesPopup;
