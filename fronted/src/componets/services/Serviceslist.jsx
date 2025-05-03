import React from "react";
import { services } from "../../assets/data/services";
import { ChevronRight } from "lucide-react"; // Ensure lucide-react is installed

const ServicesList = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4 md:px-8">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide md:text-4xl lg:text-5xl transition-all duration-500 ease-in-out hover:text-blue-600">
    Our Medical services
    </h2>
        <div className="grid grid-cols-1 mt-12 md:grid-cols-3 gap-8">
          {services.map((item, index) => {
            // Calculate the dynamic background color for the arrow based on index + 1
            const arrowBgColor ='blue'
            //   index + 1 === 1
            //     ? item.bgColor
            //     : index + 1 === 2
            //     ? item.bgColor
            //     : index + 1 === 3
            //     ? item.bgColor
            //     : "blue"; // Default to white if no specific background color

            return (
              <div
                key={index}
                className="relative p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-50 "
                style={{
                  backgroundColor: "white", // Default card background
                }}
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mb-6">{item.desc}</p>
                {/* Arrow Button */}
                <button
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 p-4 rounded-full shadow-lg hover:bg-gray-100 transition"
                  style={{ backgroundColor: arrowBgColor }}
                >
                  <ChevronRight className="w-5 h-5 text-white font-bold" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
