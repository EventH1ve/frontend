

const Counters = ({counters}) => {
    // console.log(counters)

    return (
        <div className="bg-white p-4 mt-4 rounded-lg shadow-md  md:mx-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-lg">
                    <div className="p-4">
                        <h4 className="text-lg font-medium mb-2">
                            Partners
                            <i className="mdi mdi-ticket mdi-24px float-right"></i>
                        </h4>
                        <h2 className="text-4xl font-bold">{counters.organizers}</h2>
                        <h6 className="text-xs font-medium">
                         Have the ability to create events
                        </h6>
                    </div>
                </div>
                <div className="col-span-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow-lg">
                    <div className="p-4">
                        <h4 className="text-lg font-medium mb-2">
                            Total Users
                            <i className="mdi mdi-currency-usd mdi-24px float-right"></i>
                        </h4>
                        <h2 className="text-4xl font-bold">{counters.attendees}</h2>
                        <h6 className="text-xs font-medium">
                            Total users use the platform
                        </h6>
                    </div>
                </div>
                <div className="col-span-1 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-lg">
                    <div className="p-4">
                        <h4 className="text-lg font-medium mb-2">
                            Active Events
                            <i className="mdi mdi-account-check mdi-24px float-right"></i>
                        </h4>
                        <h2 className="text-4xl font-bold">{counters.activeEvents}</h2>
                        <h6 className="text-xs font-medium">
                            Total number of upcoming events in platform
                        </h6>
                    </div>
                </div>
                <div className="col-span-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg shadow-lg">
                    <div className="p-4">
                        <h4 className="text-lg font-medium mb-2">
                        Total Transactions
                            <i className="mdi mdi-account-group-outline mdi-24px float-right"></i>
                        </h4>
                        <h2 className="text-4xl font-bold">{counters.transactionsProcessed}</h2>
                        <h6 className="text-xs font-medium">
                            Total Transactions processed so far
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Counters