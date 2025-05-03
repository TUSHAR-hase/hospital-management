
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaAmbulance, FaUserMd, FaProcedures } from 'react-icons/fa';
import hospitalImage from "../assets/images/building.jpg"
import { BASE_URL } from '../../config'
import { useToast } from './tostcontext';

const Contect = () => {
  const nevigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [user, setuser] = useState([]);

  const userid = localStorage.getItem("userid")
  const nameRef = useRef();
  const mobileRef = useRef();
  const subjectRef = useRef();
  const messageRef = useRef();
  const [loading, setLoading] = useState(false);
const showTost = useToast();
  useEffect(() => {
    const userid = localStorage.getItem("userid")
    const doctorid = localStorage.getItem("doctorid")
    const token = localStorage.getItem("token")


    if (!userid || !token) {
showTost({ type: "error", message:"You need to login to access this page." });
      nevigate("/login")
    }
  }, [])
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
    fetch(`${BASE_URL}/api/v1/users/singleuser/${userid}`)
      .then(response => response.json())
      .then(data => {
        setuser(data.getuserdetail);
        setLoading(false);
        // console.log(user)
      })
      .catch(error => {
        console.error("Error fetching user:", error);
        setError("Failed to load user. Please try again.");
        setLoading(false);
      });
    // console.log(user)
  }, []);
  const onsendmessage = async (e) => {
    console.log(e)
    e.preventDefault();
    setLoading(true);
    const userid = localStorage.getItem("userid")
    const token = localStorage.getItem("token")
    const fullName = nameRef.current.value;
    const mobileNumber = mobileRef.current.value;
    const subject = subjectRef.current.value;
    const message = messageRef.current.value;

    try {
      const res = await fetch(`${BASE_URL}/api/v1/contectmessage/sendmessage`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, token, fullName, mobileNumber, subject, message })
      })
      const data = await res.json()
      console.log(data)
      showTost({ type: "success", message:"Your response has been sent successfully!" });
      nameRef.current.value = "";
      mobileRef.current.value = "";
      subjectRef.current.value = "General Inquiry"; // default value or empty string
      messageRef.current.value = "";
    } catch (error) {
    showTost({ type: "error", message:"Failed to send message. Please try again." });
      console.error(error);
    } finally {
      setLoading(false);  // Stop loading
    }
  }
  console.log(user)
  return (
    <div className="bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-96">
        <img
          src={hospitalImage}
          alt="Healing Horizons Hospital"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Healing Horizons Hospital</h1>
          <p className="text-xl text-white">24x7 Compassionate Care Since 2005</p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Emergency Card */}
          <div className="bg-red-100 p-8 rounded-lg text-center">
            <FaAmbulance className="text-red-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Emergency Services</h3>
            <p className="mb-4">24x7 Ambulance Support</p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700">
              Call Now: 108
            </button>
          </div>

          {/* Doctors Card */}
          <div className="bg-blue-100 p-8 rounded-lg text-center">
            <FaUserMd className="text-blue-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Consult Our Experts</h3>
            <p className="mb-4">50+ Specialist Doctors</p>
            <button onClick={() => nevigate(`/profile/${userid}`)} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
              Book Appointment
            </button>
          </div>

          {/* Facilities Card */}
          <div className="bg-green-100 p-8 rounded-lg text-center">
            <FaProcedures className="text-green-600 text-4xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Facilities</h3>
            <p className="mb-4">500+ Beds, Advanced ICU</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700">
              Take Virtual Tour
            </button>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-blue-600 mt-1 mr-4 text-xl" />
                  <div>
                    <h3 className="text-xl font-semibold">Main Hospital</h3>
                    <p className="text-gray-600">
                      123 Wellness City,<br />
                      Mumbai, Maharashtra - 400001
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaPhone className="text-blue-600 mt-1 mr-4 text-xl" />
                  <div>
                    <h3 className="text-xl font-semibold">Phone Numbers</h3>
                    <p className="text-gray-600">
                      General Inquiry: 022-12345678<br />
                      Emergency: 022-87654321
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaClock className="text-blue-600 mt-1 mr-4 text-xl" />
                  <div>
                    <h3 className="text-xl font-semibold">Working Hours</h3>
                    <p className="text-gray-600">
                      OPD: 9:00 AM - 9:00 PM<br />
                      ICU: 24x7 Operational
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Our Gallery</h3>
              <div className="grid grid-cols-3 gap-4">
                <img src="/gallery1.jpg" alt="Hospital Ward" className="rounded-lg h-32 object-cover" />
                <img src="/gallery2.jpg" alt="Operation Theater" className="rounded-lg h-32 object-cover" />
                <img src="/gallery3.jpg" alt="Waiting Area" className="rounded-lg h-32 object-cover" />
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>

            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name='name'
                ref={nameRef}

                className="w-full px-4 py-2 border rounded-lg"

              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Mobile Number</label>
              <input
                type="tel"
                ref={mobileRef}
                name='mobile'
                className="w-full px-4 py-2 border rounded-lg"

              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select name='subject' ref={subjectRef} className="w-full px-4 py-2 border rounded-lg">
                <option>General Inquiry</option>
                <option>Doctor Appointment</option>
                <option>Medical Certificate</option>
                <option>Ambulance Service</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name='message'
                rows={4}
                ref={messageRef}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <button
              type="button"
              onClick={onsendmessage}
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white flex justify-center items-center 
    ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>


          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Expert Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="bg-white p-6 rounded-xl shadow-lg text-center"
                onClick={() => nevigate(`/doctordetail/${doctor._id}`)}>
                <img
                  src={doctor.image}
                  alt="Dr. Rajesh Verma"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-sm text-gray-500 mt-2">{doctors.experience}+ Years Experience</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white p-4 rounded-xl shadow-lg mb-16">
          <iframe
            title="Hospital Location"
            className="w-full h-96 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.755837470158!2d72.8775114153786!3d19.05072225872675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8dcf02a7a6b%3A0xd641c0e7d38d3a4e!2sMumbai%20Hospital!5e0!3m2!1sen!2sin!4v1658322347595!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contect;