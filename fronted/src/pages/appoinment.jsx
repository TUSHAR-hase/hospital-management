
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    selectedDoctor: "",
    appointmentDate: "",
    appointmentTime: "",
    symptoms: "",
    paymentMethod: "Online",
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
const userid=localStorage.getItem("userid")
  // Fetch doctors on component mount
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
  useEffect(()=>{
       const userid=localStorage.getItem("userid")
       if(!userid){
        navigate("/login")
       }
     },[])
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
console.log(formData);
  // Submit Appointment Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentDetails = {
      patientId: userid,
     
      doctorId: formData.selectedDoctor,
      date: formData.appointmentDate,
      timeSlot: formData.appointmentTime,
      symptoms: formData.symptoms,
      payment: {
        method: formData.paymentMethod,
        
      }
    };

    try {
      const response = await fetch(`${BASE_URL}/api/v1/appoinment/postappoinment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentDetails),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Appointment booked successfully!");
        setTimeout(() => navigate(`/profile/${userid}`), 2000); // Redirect after success
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Book an Appointment</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {message && <p className="text-green-500 text-center">{message}</p>}

      {loading ? (
        <p className="text-center">Loading doctors...</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Patient Name */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Full Name</label>
              <input
                type="text"
                name="patientName"
                className="p-3 border rounded-lg mt-2"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Email</label>
              <input
                type="email"
                name="patientEmail"
                className="p-3 border rounded-lg mt-2"
                value={formData.patientEmail}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Phone Number</label>
              <input
                type="text"
                name="patientPhone"
                className="p-3 border rounded-lg mt-2"
                value={formData.patientPhone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Doctor Selection */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-lg font-semibold">Select Doctor</label>
              <select
                name="selectedDoctor"
                className="p-3 border rounded-lg mt-2"
                value={formData.selectedDoctor}
                onChange={handleChange}
                required
              >
                <option value="">Choose a doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>

            {/* Appointment Date */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-lg font-semibold">Date</label>
              <input
                type="date"
                name="appointmentDate"
                className="p-3 border rounded-lg mt-2"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Appointment Time */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-lg font-semibold">Time</label>
              <input
                type="time"
                name="appointmentTime"
                className="p-3 border rounded-lg mt-2"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Symptoms */}
            <div className="flex flex-col sm:col-span-2">
              <label className="text-lg font-semibold">Symptoms (Optional)</label>
              <textarea
                name="symptoms"
                className="p-3 border rounded-lg mt-2"
                value={formData.symptoms}
                onChange={handleChange}
              />
            </div>

            {/* Payment Method */}
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Payment Method</label>
              <select name="paymentMethod" className="p-3 border rounded-lg mt-2" value={formData.paymentMethod} onChange={handleChange}>
                <option value="Online">Online</option>
                <option value="Card">Card</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white py-3 px-8 mt-6 rounded-lg hover:bg-blue-600 transition-all">
            Book Appointment
          </button>
        </form>
      )}
    </div>
  );
};

export default AppointmentPage;
