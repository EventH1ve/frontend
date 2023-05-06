import EventDataContainer from '../../../components/Admin_Components/Event_ID_partials/EventDataContainer';
import EventPricing from '../../../components/Admin_Components/Event_ID_partials/EventPricing';
import EventDescription from '../../../components/Admin_Components/Event_ID_partials/EventDescription';
import Cover from '../../../components/Admin_Components/Event_ID_partials/Cover';
import UserNavBar from "../../../components/Admin_Components/AdminNavBar";
import Footer from "../../../components/FooterComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function EventPage() {
    const router = useRouter();
    const eventId = router.query.eventId;
    const [eventData, setEventData] = useState([]);

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
        
    }, []);

    useEffect(() => {
        console.log(eventData.description);
    });



    if (!eventData || !eventData.cover)
        return <div>loading...</div>;
    else
        return (
            <div className="bg-[color:var(--primary-color)]">
                <UserNavBar />
                <div className="flex flex-col items-center justify-center">

                    <Cover eventData={eventData} />

                    <EventDataContainer eventData={eventData}  />

                    <div className="container mt-4 bg-[color:var(--primary-color)]">
                        <div className="container">
                            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                                <EventDescription eventData={eventData} />
                                <EventPricing eventData={eventData}  />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
}
export default EventPage;
