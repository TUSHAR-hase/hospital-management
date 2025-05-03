
import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaStethoscope, FaStar, FaRegClock, FaUserMd } from "react-icons/fa";
import { motion } from "framer-motion";

const FindDoctors = () => {

  const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(()=>{
      const userid=localStorage.getItem("userid")
     const token=localStorage.getItem("token")

      if(!userid|| !token){
        alert("Please...Login OR Create Account")
       navigate("/login")
      }
    },[])
    useEffect(() => {
      fetch(`${BASE_URL}/api/v1/doctors/alldoctor`)
        .then(response => response.json())
        .then(data => {
          setDoctors(data.doctor);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching doctors:", error);
          setLoading(false);
        });
    }, []);
  
    const filteredDoctors = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
    );
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
          >
            Connect with Health Experts<br />
            <span className="text-blue-200">As Per Your Needs</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-3xl mx-auto bg-white rounded-lg p-2 shadow-xl"
          >
            <div className="flex items-center">
              <FaSearch className="ml-4 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search doctor by name, specialty, or symptoms..."
                className="w-full px-4 py-3 text-gray-800 focus:outline-none text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors ml-2">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 px-4 -mt-16">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                        />
                        <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                          <FaUserMd className="text-blue-600 text-xl" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium">{doctor.specialization}</p>
                        <div className="flex items-center mt-2">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-sm font-medium text-gray-600">
                            {doctor.rating} ({doctor.totalPatients}+ reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <FaStethoscope className="mr-3 text-blue-500" />
                        <span>{doctor.experience}+ years of experience</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaRegClock className="mr-3 text-blue-500" />
                        <div>
                          <p className="font-medium">Availability:</p>
                          <p>{doctor.availability?.days?.join(", ")}</p>
                          <p>{doctor.availability?.timeSlots?.join(", ")}</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/doctordetail/${doctor._id}`)}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
                    >
                      Book Appointment
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block bg-blue-50 p-8 rounded-full mb-6">
                <FaUserMd className="text-blue-600 text-6xl" />
              </div>
              <p className="text-xl text-gray-600 font-medium">No matching doctors available</p>
              <p className="text-gray-500 mt-2">Please try modifying your search criteria</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FindDoctors;
