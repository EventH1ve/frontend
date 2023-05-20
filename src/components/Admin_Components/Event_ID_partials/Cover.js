
import Image from "next/image";


function Cover({eventData}) {
    return (

        <div className="relative h-40 sm:h-[25rem] overflow-hidden container shadow-lg w-full">
            {/* blurred image background */}
            <Image src={eventData.cover} alt={eventData.name} fill placeholder="blur" blurDataURL={eventData.cover} className="h-[25rem] container filter blur hidden lg:block object-cover" />

            <div className="absolute inset-0 w-full h-40 sm:h-[25rem] container">
                <Image
                    loader={() => eventData.cover}
                    // src="https://assets-in.bmscdn.com/nmcms/events/banner/desktop/media-desktop-jo-bolta-hai-wohi-hota-hai-ft-harsh-gujral-0-2023-2-3-t-9-23-51.jpg"
                    src={eventData.cover}
                    alt="Event image"
                    fill
                    className="absolute object-contain object-center"
                />
            </div>
        </div>
    );
}
export default Cover;