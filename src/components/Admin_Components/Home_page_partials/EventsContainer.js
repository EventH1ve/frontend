import React, { useState, useEffect, use } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import EventCard from "./EventCard";
import LoadingComponent from "../../LoadingComponent";
import { useRouter } from "next/router";

const EventsContainer = ({ Events }) => {
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();



    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (Events.length !== 0) {
            setIsLoading(false);
        }
    }, [Events]);

    const handleAddEvent = () => {
        router.push("/admins/event/addevent");
    };

    return (
        <div className="flex flex-wrap justify-center gap-6 md:gap-3">
            {isLoading ? (
                <LoadingComponent />
            ) : Events.length === 0 ? (
                <div className="flex flex-col gap-5 items-center justify-center w-full  mt-4 w-screen  h-[50vh]">
                    <h1 className="text-2xl text-[color:var(--darker-secondary-color)]  mb-5 flex justify-center ">
                    No events </h1>
                    <FaExclamationTriangle color="red" size={50} />
                    <button type="submit" className="mt-7 btn text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)]   "
                        onClick={handleAddEvent}
                    >

                        Add Event
                    </button>
                </div>
            ) : (
                Events.map((event) => <EventCard key={event.id} event={event} />)
            )}


        </div>
    );
};

export default EventsContainer;
