import {useState} from 'react';
import { useRouter } from "next/router";


function EventDataContainer({ eventData }) {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const eventId = router.query.eventid;
    

    return (
        <div className="bg-white py-4 mt-4 m-2 rounded-lg shadow-md  md:m-4">
            <div className="  px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-bold text-gray-700 mb-2">
                            {eventData.name}
                        </h1>
                        <div className="flex flex-col md:flex-row">
                            <div className="text-md text-gray-800 mr-4">
                                <span className="font-bold">
                                    Date:
                                </span>{" "}
                                {eventData.date}
                            </div>
                            <div className="text-md text-gray-800 mr-4">
                                <span className="font-bold">
                                    Time:
                                </span>{" "}
                                {eventData.time}
                            </div>
                            <div className="text-md text-gray-800 mr-4">
                                <span className="font-bold">
                                    Venue:
                                </span>{" "}
                                {eventData.venue}
                            </div>
                            <div className="text-md text-gray-800 mr-4">
                                <span className="font-bold ">
                                    Organizer:
                                </span>{" "}
                                {eventData.organizer}
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col mt-2 md:mt-4">
                        
                        <button type="button" class="mt-2 btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0 whitespace-nowrap"  onClick={() => router.push(`/admins/event/update/${eventId}`)}>
                            Update Event
                        </button>
                    </div>
                    
                </div>
                
            </div>
           
        </div>



    );
}
export default EventDataContainer;