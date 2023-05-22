import { useEffect, useState } from 'react';
import {  FaSearchengin, FaTimes } from 'react-icons/fa';
import { TextField } from '@mui/material';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import AddAdminForm from './AddAdminForm';


const Admins = ({ adminss }) => {
    const [admins, setAdmins] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredAdmins = admins.filter(event => {
        return event.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const closePopup = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        setAdmins(adminss)

    }, [])




    const handleTransactionClick = (attendeeID) => {
        // do something when attendee id is clicked
    };

    return (
        <div className="bg-white p-4 m-2 md:m-4 rounded-lg shadow-md">
            <div className="flex justify-between mb-2">
                <p className="mb-2 text-3xl text-gray-500">Organizers</p>
                <div className="flex justify-end p-2 md:block hidden">
                    <TextField
                        label="Search Organizers"
                        sx={TextFieldStyle}
                        variant="outlined"
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by Name"
                        InputProps={{
                            endAdornment: <FaSearchengin size={24} />,
                        }}
                    />
                </div>
                <button
                    className="bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white font-bold py-2 px-4 rounded-full h-13"
                    onClick={togglePopup}
                >
                    Add One
                </button>
                <Popup
                    open={isOpen}
                    onClose={closePopup}
                    modal
                    contentStyle={{ maxWidth: "1500px", padding: "0rem", borderRadius: "20px", width: "85%", maxHeight: "95%", overflow: "auto" }}
                    className="center-popup"
                >
                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "-28px" }}>
                        <button className="m-3 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white font-bold py-2 px-2 rounded-full"
                            onClick={togglePopup}
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>
                    <AddAdminForm />
                </Popup>
            </div>

            <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                <table className="min-w-max w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Name</th>
                            <th className="py-3 px-6 text-center">mail</th>
                            <th className="py-3 px-6 text-center">Mobile Number</th>
                            <th className="py-3 px-6 text-center">Remaining</th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-600 text-sm font-light">
                        {admins.map((admin) => (
                            <tr key={admin.id}>
                                <td className="py-3 px-6 text-center">{admin.name}</td>
                                <td className="py-3 px-6 text-center">{admin.email}</td>
                                <td className="py-3 px-6 text-center">{admin.phonenumber}</td>
                                <td className="py-3 px-6 text-center">{admin.remainingQuantity}</td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </div>
    );
};
const TextFieldStyle =
{
    "& .MuiOutlinedInput-root": {

        "&.Mui-focused fieldset": { borderColor: "var(--darker-secondary-color)" },
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
        color: "var(--gray-color  )"
    }
}

export default Admins