import EventDataContainer from '../../../components/Admin_Components/Event_ID_partials/EventDataContainer';
import EventPricing from '../../../components/Admin_Components/Event_ID_partials/EventPricing';
import EventDescription from '../../../components/Admin_Components/Event_ID_partials/EventDescription';
import Cover from '../../../components/Admin_Components/Event_ID_partials/Cover';
import UserNavBar from "../../../components/Admin_Components/AdminNavBar";
import Footer from "../../../components/FooterComponent";
import LoadingComponent from "../../../components/LoadingComponent";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "../../../utils/axios";


function EventPage() {
  const router = useRouter();
  const eventId = router.query.eventid;
  const [eventData, setEventData] = useState([]);

  // function to handle share button click
  const share = () => {
    console.log("share button clicked");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/event/${eventId}`);
        if (response.status === 200) {
          const data = response.data;
          data.id = eventId;
          setEventData(data);
          setIsUserRegistered(
            data.participants.some((participant) => participant.id === userId)
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






  if (!eventData || !eventData.cover)
    return <LoadingComponent />;
  else
    return (
      <div className="bg-[color:var(--primary-color)]">
        <UserNavBar />
        <div className="flex flex-col items-center justify-center md:mx-5">

          <Cover eventData={eventData} />

          <EventDataContainer eventData={eventData} />

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
