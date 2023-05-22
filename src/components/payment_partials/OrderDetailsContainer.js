import React, { useRef, useState, useEffect } from "react";
import { FaCheckCircle } from 'react-icons/fa';

const OrderDetailsContainer = ({ subtotal, orderId, ticketURL }) => {
  return (
    <div className="bg-white p-8 m-8 mt-3 rounded-lg shadow-md w-full md:w-[95%] ">
      <div className="relative">
        <div
          className="flex justify-center items-center gap-9 overflow-x-auto whitespace-nowrap"
        >
            <FaCheckCircle size={150} color="green" />
        </div>
        <div>
            <p className="text-center text-xl">Your order is successful with order id: {orderId}</p>
            <p className="text-center text-lg">Total amount: {subtotal/100} EGP</p>
        </div>
        <div
          className="flex justify-center items-center gap-9 overflow-x-auto whitespace-nowrap"
        >
            
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsContainer;
