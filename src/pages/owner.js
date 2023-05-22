import axios from "axios"
import React, { useEffect, useState } from "react"
import Header from "../components/Owner_page_partials/Header" 
import Counters from "../components/Owner_page_partials/Counters"
import Admins from "../components/Owner_page_partials/Admins"
import LoadingComponent from "../components/LoadingComponent"




const Owner = () => {
    const [ownerData, setOwnerData] = useState([])

    useEffect(() => {
        try {
            axios.get('http://34.125.23.115:8000/api/owner')
            .then((res) => {
                // console.log(res.data)
                setOwnerData(res.data)
            })
        }
        catch (error) {
            console.log(error)
        }
        
    }, [])

    if (ownerData.length === 0) {
        return (
            <div className="flex items-center justify-center w-screen h-screen">
                </div>
        )
    }

    return (
        <div className="bg-[color:var(--primary-color)]">
            <Header />
            <Counters counters={ownerData.counters} />
            <Admins adminss={ownerData.admins} />
        </div>
    )
}

export default Owner

