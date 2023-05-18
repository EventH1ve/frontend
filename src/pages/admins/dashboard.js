import AdminNavBar from "../../components/Admin_Components/AdminNavBar";
import Counters from "../../components/Admin_Components/AdminDashboard/Counters";
import UpcomingEvents from "../../components/Admin_Components/AdminDashboard/UpcomingEvents";
import PastEvents from "../../components/Admin_Components/AdminDashboard/PastEvents";
import Moderators from "../../components/Admin_Components/AdminDashboard/Moderators";

import LoadingComponent from "../../components/LoadingComponent";
import Footer from "../../components/FooterComponent";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


const Dashboard = () => {
    const [counters, setCounters] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    // const [moderators, setmoderators] = useState([]);

    const {status , data } = useSession();

   

    const dashboardData = async () => {
        try {
            const res = await axios.get("/api/dashboard/admin");
            console.log(res.data);
            console.log(res.data.counters);
            console.log(res.data.upcomingEvents);
            console.log(res.data.PastEvents);
            setCounters(res.data.counters);
            setUpcomingEvents(res.data.upcomingEvents);
            setPastEvents(res.data.pastEvents);
            // setmoderators(res.data.Moderators)
            setLoading(false); // set loading to false when data is fetched
        } catch (error) {
            console.log(error);

        }

    };

    const router = useRouter();

    useEffect(() => {
        dashboardData();
        
    }, [status]);


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
    
    if (counters.length === 0) {
        return <LoadingComponent />;
    }

    return (
        <>
            <div className="bg-[color:var(--primary-color)]">
                <AdminNavBar />

                <Counters Counters={counters} />
                <UpcomingEvents UpcomingEvents={upcomingEvents} />
                <PastEvents PastEvents={pastEvents} />
                {/* <Moderators moderators={moderators} /> */}

                <Footer />

            </div>
        </>
    );
};

export default Dashboard;
