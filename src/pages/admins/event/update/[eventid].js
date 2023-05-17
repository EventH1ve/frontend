import AdminNavBar from "../../../../components/Admin_Components/AdminNavBar"
import UpdateEventForm from "../../../../components/Admin_Components/Update_Event_page_partials/UpdateEventForm"
import Footer from "../../../../components/FooterComponent"
import LoadingComponent from "../../../../components/LoadingComponent"
import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"


const updateevent = () => {
    const { status, data } = useSession();
    const router = useRouter();
    const eventId = router.query.eventid;

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


    return (
        <div>

            <AdminNavBar />
            <div className="min-h-screen bg-primary-color flex flex-col justify-center items-center ">
                <div className="  p-8 bg-white rounded-lg shadow-lg w-[90%] md:min-w-[65%] mt-4">
                    <div className="flex justify-center mb-8">
                        <a href='/'>
                            <img src="/favicon_io/eventhive-logo.svg" width={500} className="" alt="Logo" />
                        </a>
                    </div>
                    <UpdateEventForm eventId={ eventId } />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default updateevent