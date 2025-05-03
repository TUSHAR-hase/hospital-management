// ServicesPage.tsx
import { useEffect } from 'react';
import { FaUserShield, FaCalendarCheck, FaFileMedical, FaUserMd, FaClinicMedical, FaVideo, FaAmbulance } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import serviceImage from "../assets/images/me.jpg"

const ServicesPage = () => {
  const nevigate=useNavigate();
  const userid=localStorage.getItem("userid")

   useEffect(()=>{
     const userid=localStorage.getItem("userid")
     const token=localStorage.getItem("token")
     
     if(!userid|| !token){
      alert("Please...Login OR Create Account")

      nevigate("/login")
     }
   },[])
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <img 
          src={serviceImage} 
          alt="Medical Services" 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Comprehensive Healthcare Solutions</h1>
          <p className="text-xl text-white">Your Health, Our Priority - Advanced Care Management System</p>
        </div>
      </div>

      {/* Main Services Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Key Services</h2>

        {/* Administration Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-blue-900 mb-8 flex items-center">
            <FaUserShield className="mr-3" /> Administration Management
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-semibold mb-4">User Management</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Doctor Registration & Profile Management</li>
                <li>Patient Registration & Records</li>
                <li>Role-based Access Control</li>
                <li>Staff Scheduling & Management</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-semibold mb-4">System Management</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Appointment Scheduling System</li>
                <li>Medical Certificate Generation</li>
                <li>Billing & Payment Integration</li>
                <li>Real-time Analytics Dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Patient Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-green-900 mb-8 flex items-center">
            <FaClinicMedical className="mr-3" /> Patient Services
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaCalendarCheck className="text-4xl text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Online Appointments</h4>
              <p className="text-gray-600">Book, reschedule, or cancel appointments 24/7</p>
              <button onClick={()=>nevigate("/doctors")} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                Book Now
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaFileMedical className="text-4xl text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Medical Certificates</h4>
              <p className="text-gray-600">Instant digital certificate generation</p>
              <button onClick={()=>nevigate(`/profile/${userid}`)} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">
                Generate Now
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <FaVideo className="text-4xl text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Telemedicine</h4>
              <p className="text-gray-600">Virtual consultations with specialists</p>
              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700">
                Start Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Doctor Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-purple-900 mb-8 flex items-center">
            <FaUserMd className="mr-3" /> Doctor Portal
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Appointment Management</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Real-time Appointment Calendar</li>
                <li>Patient History Access</li>
                <li>Prescription Management</li>
                <li>Medical Certificate Authorization</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h4 className="text-xl font-semibold mb-4">Clinical Tools</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Digital Patient Records</li>
                <li>Diagnostic Test Integration</li>
                <li>Treatment Plan Templates</li>
                <li>Collaboration Portal</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Emergency Services */}
        <div className="bg-red-50 p-8 rounded-xl shadow-lg mb-16">
          <div className="flex items-center mb-6">
            <FaAmbulance className="text-3xl text-red-600 mr-4" />
            <h3 className="text-2xl font-bold text-red-900">Emergency Services</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">24/7 Emergency Care</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Immediate ambulance dispatch</li>
                <li>Emergency department tracking</li>
                <li>Critical care coordination</li>
                <li>Emergency bed management</li>
              </ul>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold text-red-600 mb-4">Emergency Hotline</p>
              <a href="tel:108" className="text-3xl font-bold text-red-700 hover:text-red-800">
                108
              </a>
              <p className="mt-2 text-gray-600">Available 24 hours, 7 days a week</p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold mb-4">Medical Records</h4>
            <p className="text-gray-600">Secure digital storage of patient histories, test results, and treatment plans</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold mb-4">Billing System</h4>
            <p className="text-gray-600">Transparent billing with insurance integration and online payments</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h4 className="text-xl font-semibold mb-4">Reports & Analytics</h4>
            <p className="text-gray-600">Comprehensive reports for administrators and statistical analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;