import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { FaPlus, FaTimes } from 'react-icons/fa';
import SeatsMap from './SeatsMap';
import Popup from 'reactjs-popup';
import "reactjs-popup/dist/index.css";
import { Cloudinary } from 'cloudinary-core';
import axios from "../../../utils/axios";
import { useRouter } from "next/router";


const cloudinary = new Cloudinary({
    cloud_name: "dacn7ee03",
    api_key: "642655988859922",
    api_secret: "aPbCxTG4eqzCJd-hNyWnb9Q_wdQ"
});


function AddEventForm() {
    const router = useRouter();
    const [imageUrl, setImageUrl] = useState();
    const [eventName, setEventName] = useState('');
    const [coverImage, setCoverImage] = useState();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [venue, setVenue] = useState('');
    const [description, setDescription] = useState('');
    const [ticketTypes, setTicketTypes] = useState([
        {
            name: '', price: '', limit: '', seated: false, seats: {
                A:[0,0,0],
                B:[0,0,0],
                C:[0,0,0]
            }
        },
    ]);

    const handleTicketTypeChange = (index, field, value) => {
        const updatedTicketTypes = [...ticketTypes];
        updatedTicketTypes[index][field] = value;
        setTicketTypes(updatedTicketTypes);
    };

    const handleAddTicketType = () => {
        setTicketTypes([
            ...ticketTypes,
            {
                name: '', price: '', limit: '', seated: false, seats: {
                    A:[0,0,0],
                    B:[0,0,0],
                    C:[0,0,0]
                }
            },
        ]);
    };


    useEffect(() => {
        async function uploadToCloudinary(file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'tjsdpw0w');

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setImageUrl(data.secure_url);
                }
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error);
            }
        }

        if (coverImage) {
            uploadToCloudinary(coverImage);
        }
    }, [coverImage]);


    const handleRemoveTicketType = (index) => {
        const updatedTicketTypes = [...ticketTypes];
        updatedTicketTypes.splice(index, 1);
        setTicketTypes(updatedTicketTypes);
    };

    const handleSeatsSet = (index, seats, limit) => {
        const updatedTicketTypes = [...ticketTypes];
        updatedTicketTypes[index].seats = seats;
        updatedTicketTypes[index].limit = limit;
        setTicketTypes(updatedTicketTypes);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const closePopup = () => {
        setIsOpen(false);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(ticketTypes)

        let capacity = 0;
        for (let ticket in ticketTypes) {
            ticketTypes[ticket].price = parseFloat(ticketTypes[ticket].price)
            capacity += ticketTypes[ticket].limit;            
        }

        const formData = {
            "name": eventName,
            "profile": imageUrl,
            date,
            "time": `${time}:00`,
            venue,
            capacity,
            description,
            ticketTypes,
        };
        try {
            let res = await axios.post('/api/event', formData);
            router.push('/admins')
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2">

                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="Event Name" sx={TextFieldStyle} variant="outlined" className="w-full" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField sx={TextFieldStyle} variant="outlined" className="w-full" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField sx={TextFieldStyle} variant="outlined" className="w-full" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="Venue" sx={TextFieldStyle} variant="outlined" className="w-full" value={venue} onChange={(e) => setVenue(e.target.value)} required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    <TextField label="Description" sx={TextFieldStyle} variant="outlined" className="w-full" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} required />
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                    {/**Upload cover photo  */}
                    <div>
                        <label className="mb-2 block text-gray-500">
                            Event Cover
                        </label>
                        <input
                            type="file"
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-[color:var(--secondary-color)] file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter "
                            onChange={(e) => setCoverImage(e.target.files[0])}
                            accept="image/*"
                        />
                    </div>
                </div>

            </div>
            <div className="flex flex-row-reverse ">
                <button type="button" className="p-3 text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)]   sm:w-auto  rounded-full	" onClick={handleAddTicketType}>
                    Add Ticket <FaPlus className="inline-block " size={22} />
                </button>
            </div>
            <div className="bg-white shadow-md rounded my-3 overflow-x-auto">

                <table className="min-w-max w-full table-auto overflow-x-auto">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3  text-center">Ticket Type/Name</th>
                            <th className="py-3  text-center">Price</th>
                            <th className="py-3  text-center">Limit</th>
                            <th className="py-3  text-center">Seated</th>
                            <th className="py-3  text-center">Seats</th>
                            <th className="py-3  text-center">Remove</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {ticketTypes.map((ticketType, index) => (
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 text-center">
                                    <input className="outline-none border rounded-md py-1 px-3" type="text" value={ticketType.name} onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)} required />
                                </td>
                                <td className="py-3 text-center">
                                    <input className="outline-none border rounded-md py-1 px-3" type="text" value={ticketType.price} onChange={(e) => handleTicketTypeChange(index, 'price', e.target.value)} required />
                                </td>
                                <td className="py-3 text-center">
                                    <input className="outline-none border rounded-md py-1 px-3" type="number" value={ticketType.limit} onChange={(e) => handleTicketTypeChange(index, 'limit', e.target.value)} disabled={ticketType.seated} required={!ticketType.seated} />
                                </td>
                                <td className="py-3 text-center">
                                    <input
                                        className="outline-none border rounded-md py-1 px-3 bg-[color:var(--darker-secondary-color)] border-[color:var(--darker-secondary-color)]"
                                        type="checkbox"
                                        checked={ticketType.seated}
                                        onChange={(e) => handleTicketTypeChange(index, 'seated', e.target.checked)}
                                    />
                                </td>
                                <td className="py-3 text-center">
                                    <button
                                        type="button"
                                        className={`btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full sm:w-auto sm:ml-4 ${!ticketType.seated ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        onClick={() => {
                                            togglePopup();
                                            setIndex(index);
                                        }}
                                        disabled={!ticketType.seated}
                                    >
                                        Seats
                                    </button>
                                </td>
                                <td className="py-3 text-center">
                                    <button type="button" className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full sm:w-auto sm:ml-4" onClick={() => handleRemoveTicketType(index)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>

                        ))}
                    </tbody>
                </table>
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
                <SeatsMap _seats={ticketTypes[index].seats} _index={index} _setSeats={handleSeatsSet} _togglePopUp={togglePopup} />

            </Popup>

            <div>
                <button type="submit" className="btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full  sm:w-auto sm:ml-4"  >
                    Add Event
                </button>
            </div>
        </form>
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

export default AddEventForm;

