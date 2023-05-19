import { useRouter } from "next/router";

function EventDataContainer({ eventData }) {
    
    const router = useRouter();


    return (
        <div className="container bg-white  mt-4 rounded-lg shadow-md">
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
                    <div class="flex flex-col mt-2 md:mt-4">
                        <button type="button" class="mt-1 btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0 whitespace-nowrap" onClick={() => router.push(`/admins/event/statistics/${eventData.id}`)}>
                            Event Statistics
                        </button>
                        
                        <button type="button" class="mt-2 btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0 whitespace-nowrap" onClick={() => router.push(`/admins/event/update/${eventData.id}`)}>
                            Update Event
                        </button>
                    </div>

                </div>
                <div className="border-b border-gray-300 mt-8 mb-4"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-5">
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
                            className="m-2 px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                        >
                            Share
                        </button>
                    </div>
                </div>
            </div>

        </div>



    );
}
export default EventDataContainer;