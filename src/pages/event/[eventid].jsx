import EventDataContainer from '../../components/Event_ID_partials/EventDataContainer';
import EventPricing from '../../components/Event_ID_partials/EventPricing';
import EventDescription from '../../components/Event_ID_partials/EventDescription';
import Cover from '../../components/Event_ID_partials/Cover';
import UserNavBar from "../../components/UserNavBar";
import Footer from "../../components/FooterComponent";
import LoadingComponent from "../../components/LoadingComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "../../utils/axios";


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
                const response = await axios.get('/eventid');
                if (response.status === 200) {
                    const data = response.data;
                    setEventData(data);
                    setIsUserRegistered(
                        data.participants.some(
                            (participant) => participant.id === userId
                        )
                    );
                } else {
                    throw new Error('Failed to fetch event data');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const { status, data } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            if (data.user.role === "admin") {
                router.push("/auth/signin");
            } else {
                return;
            }
        }
       

    }, [status]);


   

    // Check if the user exists and is not an admin
    if (status === "authenticated" && data && data.user.role == "admin") {
        return <LoadingComponent />;
    }



    if (!eventData || !eventData.cover)
        return <LoadingComponent />;
    else
        return (
            <div className="bg-[color:var(--primary-color)]">
                <UserNavBar />
                <div className="flex flex-col items-center justify-center">

                    {/* Top div with image */}
                    <Cover eventData={eventData} />

                    {/* Second div with event details and ticket pricing */}
                    <EventDataContainer eventData={eventData} />

                    {/* Third div with major event details */}
                    <div className="container mt-4 bg-[color:var(--primary-color)]">
                        <div className="container">
                            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                                <EventDescription eventData={eventData} />
                                <EventPricing eventData={eventData} />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
}
export default EventPage;
