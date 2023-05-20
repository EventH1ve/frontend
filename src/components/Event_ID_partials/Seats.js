import { useState, useEffect } from "react";
import { FaChair, FaSearchPlus, FaSearchMinus } from "react-icons/fa";

const Seats = ({ selectedTicket, seatsGrid, handleSetSeats, selected_Seats }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [bookedSeats, setBookedSeats] = useState([]);
    const [zoom, setZoom] = useState(1);
    const [seats, setSeats] = useState({ ...seatsGrid });

    /**
     * 0 - Not booked
     * 1 - Booked
     * 2 - Selected
     * 3 - Blocked
     */

    const zoomTable = (amount) => {
        setZoom(zoom + amount);
    };

    useEffect(() => {
        setSelectedSeats(selected_Seats);
    }, [selected_Seats])


    // Handle seat selection
    const handleSeatSelection = (row, seat) => {
        const currentSeats = { ...seats };
        if (currentSeats[row][seat] === 0) {
            currentSeats[row][seat] = 2; // Mark as selected
            setSelectedSeats([...selectedSeats, `${row}${seat}`]); // Add to selected seats list
        } else if (currentSeats[row][seat] === 2) {
            currentSeats[row][seat] = 0; // Unselect seat
            setSelectedSeats(selectedSeats.filter((s) => s !== `${row}${seat}`)); // Remove from selected seats list
        }
    };

    // Handle seat booking
    const handleSeatBooking = () => {
        const currentSeats = { ...seats };
        selectedSeats.forEach((seat) => {
            const row = seat.substring(0, 1);
            const index = parseInt(seat.substring(1), 10);
            // currentSeats[row][index] = 1; // Mark as booked (subtract 1 from index to account for zero-based array)
        });
        setBookedSeats([...bookedSeats, ...selectedSeats]);
        console.log(selectedSeats);
        setSelectedSeats([]);
        handleSetSeats(selectedTicket, selectedSeats);
    };

    return (
        <div className="bg-gray-100 p-8 m-5 rounded-lg  md:w-[95%] flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Seats</h2>
            <div className="overflow-auto max-w-full max-h-[500px] inline-block" >
                <table className="border-collapse min-w-10 inline-block ">
                    <tbody className="mx-auto" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
                        {Object.keys(seats).map(row => (
                            <tr key={row}>
                                {seats[row].map((seat, index) => (
                                    seat !== 3 ? (
                                        <td key={`${row}-${index}`} className="w-15">
                                            <div
                                                className={`px-4 py-2 cursor-${seat === 0 ? "pointer" : "not-allowed"} 
                              ${seat === 0 ? "bg-green-500" : seat === 1 ? "bg-red-500" : seat === 2 ? "bg-yellow-500" : "bg-gray-500"} 
                              rounded-lg mr-2 mb-2 w-16 h-15`}
                                                onClick={() => handleSeatSelection(row, index)}
                                            >
                                                <FaChair className="text-white" />
                                                {row}
                                                {index}
                                            </div>
                                        </td>
                                    ) :
                                        <td key={`${row}-${index}`} className="w-15">
                                            <div className="w-15 h-15"></div>
                                        </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex gap-6 mt-3">
                <button onClick={() => zoomTable(-0.1)}>
                    <FaSearchMinus />
                </button>
                <button onClick={() => zoomTable(0.1)}>
                    <FaSearchPlus />
                </button>
            </div>

            <div className="mt-8 flex flex-col ">
                <h3 className="text-lg font-bold mb-2 flex justify-center items-center">
                    Selected Seats</h3>
                {selectedSeats.length > 0 ? (
                    <ul className="flex flex-wrap overflow-x-auto">
                        {selectedSeats.map(seat => (
                            <li key={seat} className="m-2">{seat}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No seats selected</p>
                )}
            </div>
            <button className="px-6 py-2 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] text-white rounded focus:outline-none" onClick={handleSeatBooking}  >
                Save Selected Seats
            </button>

        </div>
    );



};

export default Seats;