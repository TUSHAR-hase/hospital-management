import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import vidio from '.././assets/images/vedio.mp4'
import img2 from '.././assets/images/icon02.png'
import img1 from '.././assets/images/icon01.png'
import img3 from '.././assets/images/icon03.png'
import About from '../componets/about/About'
import ServicesList from '../componets/services/Serviceslist'
import FeatureSection from '../componets/fecturesection/Fecture_section'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { doctors } from '../assets/data/doctors'
import { BASE_URL } from '../../config'

const Home = () => {
  const scrollRef = useRef(null);
  const nevigate=useNavigate();
  const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
//  useEffect(()=>{
//    const userid=localStorage.getItem("userid")
//    if(!userid){
//     nevigate("/login")
//    }else{
//     nevigate(`/home/${userid}`)
//    }
//  },[])
  useEffect(() => {
      fetch(`${BASE_URL}/api/v1/doctors/alldoctor`)
        .then(response => response.json())
        .then(data => {
          setDoctors(data.doctor);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching doctors:", error);
          setError("Failed to load doctors. Please try again.");
          setLoading(false);
        });
    }, []);
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  return (
    <>
    
      <section className="relative w-fill  w-full left-0 right-0  overflow-hidden pt-28 md:pt-25 " >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 left-0 right-0 w-full h-full object-cover -z-10"
        // style={{ opacity: 0.5 }} 
        >
          <source
            src={vidio}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="container relative z-10 justify-center h-full mx-auto flex flex-col-reverse md:flex-row items-center px-4 md:px-8 py-16">
          {/* Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-gray-800 leading-tight">
            Simplify Hospital Management and Enhance Patient Care
            </h1>
            <p className="mt-4  text-white text-lg">
            Our hospital management system helps you efficiently manage patient records, doctor schedules, billing, and more all in one platform. Focus on providing exceptional care while we streamline your operations.
            </p>
            <div className="mt-6">
              <NavLink
                to="/doctors"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700"
              >
                Get Started
              </NavLink>
              <NavLink
                to="/services"
                className="ml-4 bg-gray-200 text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-gray-300"
              >
                Learn More
              </NavLink>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            
          </div>
        </div>
      </section>

      {/* Additional Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Why Choose Our Hospital Management System?
          </h2>
          <p className="text-gray-600 text-center mt-4">
            Designed to streamline hospital operations and deliver the best patient care.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="flex items-center justify-center w-50 h-50 bg-blue-100 text-blue-600 rounded-full mx-auto">
                <img src={img1} alt="Book Appointment" className="h-50 w-50 object-cover" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Find Doctor
              </h3>
              <p className="mt-2 text-gray-600">
                Easily search and find doctors based on specialty and location to get the best care.

              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-50 w-50 bg-blue-100 text-blue-600 rounded-full mx-auto">
                <img src={img2} alt="Book Appointment" className="h-50 w-50" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Find Location
              </h3>
              <p className="mt-2 text-gray-600">
                Locate nearby hospitals and clinics using our easy-to-navigate map.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="flex items-center justify-center h-50 w-50 bg-blue-100 text-blue-600 rounded-full mx-auto">
                <img src={img3} alt="Book Appointment" className="h-50 w-50" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Book Appointment
              </h3>
              <p className="mt-2 text-gray-600">
                Schedule your doctor's appointment in just a few clicks with our intuitive platform.
              </p>
            </div>
          </div>
        </div>
      </section>
      <About></About>
     <ServicesList></ServicesList>
    <FeatureSection></FeatureSection>
    <section className="py-16 ">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Meet Our Doctors</h2>

        <div className="relative">
          {/* Left Scroll Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-300 transition hidden md:block"
          >
            <ChevronLeft size={36} />
          </button>

          {/* Doctor Scrollable List */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide px-4"
          >
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                
                className="min-w-[250px] md:min-w-[300px] bg-white shadow-lg rounded-lg p-6 text-center transition hover:scale-105 cursor-pointer"
                onClick={() => nevigate(`/doctordetail/${doctor._id}`)}
              >
                
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-blue-500"
                />
                <h3 className="mt-4 font-semibold text-xl">{doctor.name}</h3>
                <p className="text-md text-gray-600">{doctor.specialization}</p>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white rounded-full shadow-lg hover:bg-gray-300 transition hidden md:block"
          >
            <ChevronRight size={36} />
          </button>
        </div>
      </div>
    </section>
      </>
  )
}

export default Home