import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { useState , useEffect } from "react";

const GenderChart = ({ genderPercentage }) => {
  if (!genderPercentage) {
    return null;
  }

  console.log(genderPercentage)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const data = {
    labels: ['Female', 'Male'],
    datasets: [
      {
        data: [(Object.values(genderPercentage)[selectedIndex][1] / (Object.values(genderPercentage)[selectedIndex][0] + Object.values(genderPercentage)[selectedIndex][1])) * 100, (Object.values(genderPercentage)[selectedIndex][0] / (Object.values(genderPercentage)[selectedIndex][0] + Object.values(genderPercentage)[selectedIndex][1])) * 100],
        backgroundColor: ['rgba(255, 99, 132, 0.88)', 'rgba(53, 162, 235, 0.88)'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const handleOnClick = (index) => {
    setSelectedIndex(index);
    console.log(Object.values(genderPercentage)[selectedIndex])
  }

  return (
    <div className="bg-white p-4 m-2 md:m-4 rounded-lg shadow-md">
      <div class="border-b border-gray-200">
        <div class="sm:flex sm:justify-between">
          <div class="flex-1 min-w-0">
            <nav className="-mb-px flex justify-center" aria-label="Tabs">
              {Object.keys(genderPercentage).map((key, index) => (
                <a
                  
                  key={key}
                  className={`border-b-2 border-transparent px-4 py-2 mr-2 text-sm font-medium cursor-pointer 
                  ${ selectedIndex === index ? ' text-gray-800 border-gray-800 active:text-gray-800 active:border-gray-800 focus:text-gray-800 focus:border-gray-800' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => handleOnClick(index)}
                >
                  {key}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      
      <div>
      <h2
  style={{
    padding: "8px",


    color: "#4B5563",
    fontWeight: "bold",
    textTransform: "uppercase",
  }}
>
  {Object.keys(genderPercentage)[selectedIndex]}
</h2>

        <Doughnut data={data} width={400} height={400} />
      </div> 
    </div>
  );
};

export default GenderChart;
