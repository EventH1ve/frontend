import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import { IoMenu } from 'react-icons/io5';
import { FaUser, FaSignOutAlt, FaCog, FaPlus, FaRegCalendarAlt } from 'react-icons/fa';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header">
            <nav className="p-3 bg-white shadow md:flex md:items-center md:justify-between">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-3 cursor-pointer">
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
                    

                    <li className="my-6 md:my-0">
                        <button type="button" className="btn gap-1 text-sm text-white bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] w-full mb-4 sm:w-auto sm:mb-0 whitespace-nowrap" >
                            Dashboard
                            <FaUser />
                        </button>
                    </li>
                    <li className=" my-6 md:my-0">
                        <button type="button" className="btn gap-1 text-sm text-white bg-[color:var(--gray-color)] hover:bg-[color:var(--light-gray)] w-full sm:w-auto sm:ml-4 whitespace-nowrap" onClick={() => router.push("/")}>
                            Go back
                            <FaSignOutAlt />
                        </button>
                    </li>


                </ul>
            </nav>
            <div className="flex justify-center mb-8 mt-10">
                <h1 className="text-center text-4xl font-bold" style={{ color: 'var(--darker-secondary-color)' }}>Administration Panel</h1>
            </div>
        </div>

    )

}

export default Header