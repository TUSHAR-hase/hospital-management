import React from 'react';
import img1 from '../../assets/images/image.png'
// Array of services data with image URLs
const services = [
  {
    name: "Cancer Care",
    description:
      "We provide world-class cancer care with expert treatment options, including chemotherapy, radiation therapy, and immunotherapy.",
    imageUrl:img1, // Replace with your image URL
  },
  {
    name: "Labor & Delivery",
    description:
      "Our hospital offers comprehensive care during labor and delivery, ensuring the safety and well-being of both mother and child.",
    imageUrl: "/images/labor-delivery.jpg", // Replace with your image URL
  },
  {
    name: "Heart & Vascular",
    description:
      "We offer expert care for heart and vascular conditions, including heart surgery, cardiology services, and preventive treatments.",
    imageUrl: "/images/heart-vascular.jpg", // Replace with your image URL
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Our Specialized Services
        </h2>
        <p className="text-gray-600 text-center mt-4 mb-12">
          We offer top-notch medical services to ensure the best care for our
          patients. From cancer treatment to mental health support, we provide
          comprehensive care in various specialties.
        </p>

        {/* Dynamically Render Services in 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            >
              {/* Top Image */}
              <div className="mb-6">
                <img
                  src={service.imageUrl}
                  alt={service.name}
                  className="w-full h-56 object-cover rounded-lg"
                />
              </div>

              {/* Left Content (Text) */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex justify-center md:justify-start mt-4">
                  <a
                    href="#"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
