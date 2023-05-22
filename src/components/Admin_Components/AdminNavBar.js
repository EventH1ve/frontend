import { useEffect, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import { FaUser, FaSignOutAlt, FaCog ,FaPlus,FaRegCalendarAlt } from 'react-icons/fa';


function AdminNavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const {status , data } = useSession();

    useEffect(() => {
        if(status != "loading"){ 
            console.log(status , data.user.role);
            if (status !== "authenticated" || data.user.role !== "admin") router.push('/auth/signin');
        }
    }, [status]);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="p-3 bg-white shadow md:flex md:items-center md:justify-between">
            <div className="flex justify-between items-center">
                <div onClick={() => router.push("/")} className="flex items-center gap-x-3 cursor-pointer">
                    <img src="/favicon_io/eventhive-logo.svg" width={250} height={70} alt="Logo" />
                </div>

                <span
                    className="text-3xl cursor-pointer mx-2 md:hidden block"
                    onClick={toggleMenu}
                >
                    <IoMenu />
                </span>
            </div>

            <ul className={`md:flex md:items-center md:static absolute bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0  md:opacity-100 ${isMenuOpen ? 'opacity-100 z-10 top-[80px]' : 'opacity-0 top-[-400px]'} transition-all ease-in duration-500`} >
                <li className="mx-2 my-6 md:my-0">
                    <a href="/admins" className="text text-gray-600 hover:text-[color:var(--secondary-color)] duration-500 flex whitespace-nowrap">
                        My Events
                        <FaRegCalendarAlt className='mt-1 ml-1'/>
                    </a>
                </li>
                <li className="mx-2 my-6 md:my-0">
                    <a href="/admins/event/addevent" className="text text-gray-600 hover:text-[color:var(--secondary-color)] duration-500 flex whitespace-nowrap">
                        Create Event
                        <FaPlus className='mt-1 ml-1'/>
                    </a>
                </li>

                <li className="mx-2 my-6 md:my-0 "onClick={() => router.push("/admins/profile")}>
                    <a href="/admins/profile" className="text text-gray-600  hover:text-[color:var(--secondary-color)] duration-500 flex whitespace-nowrap">
                        Update Profile
                        <FaCog className='mt-1 ml-1'/>
                    </a>
                </li>
                
                <li className="my-6 md:my-0">
                    <button type="button" className="btn gap-1 text-sm text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0 whitespace-nowrap" onClick={() => router.push("/admins/dashboard")}>
                        Dashboard
                        <FaUser />
                    </button>
                </li>
                <li className=" my-6 md:my-0">
                    <button type="button" className="btn gap-1 text-sm text-white bg-[color:var(--gray-color)] hover:bg-[color:var(--light-gray)] w-full sm:w-auto sm:ml-4 whitespace-nowrap" onClick={() => signOut()}>
                        Signout
                        <FaSignOutAlt/>
                    </button>
                </li>

               
            </ul>
        </nav>
    );
}

export default AdminNavBar;
