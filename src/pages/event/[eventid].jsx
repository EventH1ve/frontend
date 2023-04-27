import EventDataContainer from '../../components/Event_ID_partials/EventDataContainer';
import EventPricing from '../../components/Event_ID_partials/EventPricing';
import EventDescription from '../../components/Event_ID_partials/EventDescription';
import Cover from '../../components/Event_ID_partials/Cover';
import UserNavBar from "@/components/UserNavBar";
import { getUserToken } from "@/utils/getUserToken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function EventPage() {
    const router = useRouter();
    const eventId = router.query.eventId;
    const userId = getUserToken();
    const [eventData, setEventData] = useState([]);
    const [isUserRegistered, setIsUserRegistered] = useState(false);

    // function to handle share button click
    const share = () => {
        console.log("share button clicked");
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`http://localhost:3001/eventid`);
                if (response.ok) {
                    const data = await response.json();
                    setEventData(data);
                    setIsUserRegistered(
                        data.participants.some(
                            (participant) => participant.id === userId
                        )
                    );
                } else {
                    throw new Error("Failed to fetch event data");
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [eventId, userId]);

    if (!eventData || !eventData.cover)
        return <div>loading...</div>;
    else
        return (
            <div className="bg-[color:var(--primary-color)]">
                <UserNavBar />
                <div className="flex flex-col items-center justify-center">

                    {/* Top div with image */}
                    <Cover eventData={eventData}/>

                    {/* Second div with event details and ticket pricing */}
                    <EventDataContainer eventData={eventData} isUserRegistered={isUserRegistered} share={share}/>

                    {/* Third div with major event details */}
                    <div className="container mt-4 bg-[color:var(--primary-color)]">
                        <div className="container">
                            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                                <EventDescription eventData={eventData}/>
                                <EventPricing eventData={eventData} isUserRegistered={isUserRegistered}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
export default EventPage;
