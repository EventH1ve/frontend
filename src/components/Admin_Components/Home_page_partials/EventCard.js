import { useRouter } from "next/router";
import Image from "next/image";
import { FaUsers } from "react-icons/fa";


const EventCard = ({ event }) => {
    const router = useRouter();

    return (
        <div
            onClick={() => {
                router.push(`/admins/event/${event.id}`);
            }}
            className="hover:scale-105 cursor-pointer transition-all bg-[color:var(--white-color)] rounded-lg shadow-md"
            style={{
                width: "320px",
                height: "400px",
                margin: "0px",
                display: "flex",
                flexDirection: "column",
                padding: "5px",
            }}
        >
            <div style={{ flex: "1 0 auto", position: "relative" }}>
                {event.img && (
                    <Image
                        loader={() => event.img}
                        fill
                        className="object-cover h-full w-full rounded-md"
                        src={event.img}
                        alt=""
                        sizes="(min-width: 640px) 100vw, 50vw"
                        priority
                    />
                )}
            </div>
            <div className="flex flex-row justify-between px-3 py-2">
                <div>
                    <p className="text-sm text-gray-800 font-bold">
                        {event.name.length > 30
                            ? event.name.slice(0, 30) + "..."
                            : event.name}
                    </p>
                    <p className="text-sm text-gray-800">{event.venue}</p>
                    <p className="text-sm text-gray-800">{event.date.split("T")[0]}</p>
                </div>
                <div className="flex flex-col justify-end">
                    <span className="w-full flex flex-row justify-end ">
                        <FaUsers />
                    </span>
                    <p className="text-sm text-gray-800 mt-2">
                        <strong className="whitespace-nowrap">Starts From {event.price}Egp</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
