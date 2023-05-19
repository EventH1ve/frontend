import AdminNavBar from "../../../../components/Admin_Components/AdminNavBar";
import EventData from "../../../../components/Admin_Components/Statistics_page_partials/EventData";
import Counters from "../../../../components/Admin_Components/Statistics_page_partials/Counters";
import GenderChart from "../../../../components/Admin_Components/Statistics_page_partials/GenderChart";
import ModeratorsTable from "../../../../components/Admin_Components/Statistics_page_partials/ModeratorsTable";
import AttendeesTable from "../../../../components/Admin_Components/Statistics_page_partials/AttendeesTable";
import TicketsChart from "../../../../components/Admin_Components/Statistics_page_partials/TicketsChart";
import LoadingComponent from "../../../../components/LoadingComponent";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "../../../../utils/axios";



const EventStatistics = () => {

    const [eventData, setEventData] = useState(null);

    const router = useRouter();


    const eventId = router.query.eventid;


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/api/admin/event/statistics/${eventId}`);
                if (response.status === 200) {
                    const data = await response.data;
                    console.log(data);
                    setEventData(data);
                } else {
                    throw new Error("Failed to fetch event data");
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
                return;
            } else {
                router.push("/auth/signin");
            }
        }
        if (status === "unauthenticated") {
            router.push("/auth/signin");
        }

    }, [status]);


    // Check if the user exists and is not authenticated
    if (status === "unauthenticated" || (status === "authenticated" && !data)) {
        return <LoadingComponent />;
    }

    // Check if the user exists and is not an admin
    if (status === "authenticated" && data && data.user.role !== "admin") {
        return <LoadingComponent />;
    }


    if (!eventData) return <LoadingComponent />;

    return (
        <div className="bg-[color:var(--primary-color)]">
            <AdminNavBar />
            <EventData eventData={eventData} />
            <Counters counters={eventData.Counters} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="col-span-1 md:col-span-2">
                    <TicketsChart ticketsData={eventData.ticketsData} />
                </div>
                <div className="col-span-1 md:col-span-1">
                    <GenderChart genderPercentage={eventData.genderPercentage} />
                </div>
            </div>
            <AttendeesTable att={eventData.attendees}/>
            {/* <ModeratorsTable /> */}
        </div>
    );
};

export default EventStatistics;

