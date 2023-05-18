import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from "../../utils/axios";


const Partners = () => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [partnersData, setPartnersData] = useState([]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollWidth - scrollLeft > clientWidth);
    }
  };

  useEffect(() => {
    axios.get('/api/partner')
      .then(response => {
        setPartnersData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    handleScroll();
  }, [partnersData]);

  return (
    <div className="bg-white p-8 m-8 mt-3 rounded-lg shadow-md w-full md:w-[95%] ">
      <div className="relative">
        <div
          className="flex justify-start items-center gap-9 overflow-x-auto whitespace-nowrap"
          ref={containerRef}
          style={{ scrollBehavior: "smooth" , scrollbarWidth: "none"}}
          onScroll={handleScroll}
        >
          {partnersData.map((partner, index) => (
            <div key={index} className="flex flex-col items-center shadow-lg p-1">
              <div class="w-20 h-20 overflow-hidden ">
                <img
                  src={partner.img}
                  alt={partner.name}
                  className="rounded-full mb-2object-cover w-full h-full shadow-lg"
                />
              </div>
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
        {showLeftArrow && (
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2"
            onClick={() => (containerRef.current.scrollLeft -= 200)}
          >
            <FaArrowLeft />
          </button>
        )}
        {showRightArrow && (
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2"
            onClick={() => (containerRef.current.scrollLeft += 200)}
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Partners;
