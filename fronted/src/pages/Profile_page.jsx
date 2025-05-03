import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config";
import { FaUserCircle, FaCalendarCheck, FaFileInvoice, FaStethoscope, FaPlus, FaDownload, FaFileAlt } from "react-icons/fa";
import { RiArrowDropRightLine } from "react-icons/ri";
import { useToast } from "./tostcontext";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("personal");
    const [billingRecords, setBillingRecords] = useState([]);
      const [updateuser, setUpdateduser] = useState([]);
      const userid = localStorage.getItem("userid");
    
    const [showEditModal, setShowEditModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const router = useNavigate();
    const {showToast} = useToast();
    const requestCertificate = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/appoinment/updaterequest/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            if (response.ok) {
                alert("Certificate request sent successfully!");
                // Optionally, refresh the state or fetch updated data
            } else {
                alert(data.message || "Failed to request certificate");
            }
        } catch (error) {
            console.error("Error requesting certificate:", error);
            alert("An error occurred while requesting the certificate.");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const userid = localStorage.getItem("userid");
                if (!token) {
                    router("/login");
                    return;
                }
                const res = await fetch(`${BASE_URL}/api/v1/users/singleuser/${userid}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const appointmentData = await fetch(`${BASE_URL}/api/v1/appoinment/getappoinmentbyid/${userid}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const appointment = await appointmentData.json();
                const data = await res.json();
                if (res.ok && appointmentData.ok) {
                    setUser(data.getuserdetail);
                    setUpdateduser(data.getuserdetail);
                    setBillingRecords(data.getuserdetail.billing || []);
                    setAppointments(appointment || []);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchUser();
    }, []);

    if (!user) return <div className="text-center p-10 text-2xl font-bold text-gray-700">Loading...</div>;
    const handleSave = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/v1/users/updateuser/${userid}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateuser),
          });
    
          const data = await response.json();
          console.log("Server response:", data);
          setShowEditModal(false);
          showToast({ type: "success", message: "Profile updated successfully!" });
          window.location.reload();
        } catch (error) {
          console.error("Failed to update doctor:", error);
        }
      };
    
  
     
      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUpdateduser((prev) => ({ ...prev, image: reader.result }));
          };
          reader.readAsDataURL(file); // base64
        }
      };
    // console.log(updateuser)
    return (
        <div className="min-h-screen bg-gray-50 p-8 font-['Poppins']">
            <div className="max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <img
                        src={user?.image || "/default-avatar.png"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold">{user?.name || "Unknown User"}</h1>
                        <p className="text-lg opacity-90">{user?.email}</p>
                        <div className="mt-3 inline-flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
                            <FaUserCircle className="mr-2 text-blue-600" />
                            <span className="font-medium text-blue-600">
                                {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                            </span>
                        </div>
                    </div>
                    <div>
          <button
            onClick={() => setShowEditModal(true)} 
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-gray-100 transition"
          >
            Update Profile
          </button>
        </div>
                </div>
            </div>
            {showEditModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Edit User Profile</h2>
                        <div className="space-y-4">
                            {/* Image Upload Section */}
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Profile Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border border-gray-300 p-2 rounded"
                                />

                                {updateuser.image && (
                                    <img
                                        src={updateuser.image}
                                        alt="Preview"
                                        className="w-20 h-20 mt-2 rounded-full object-cover"
                                    />
                                )}
                            </div>

                            <input
                                type="text"
                                value={updateuser.name}
                                onChange={(e) => setUpdateduser({ ...updateuser, name: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Name"
                            />

                            <input
                                type="email"
                                value={updateuser.email}
                                onChange={(e) => setUpdateduser({ ...updateuser, email: e.target.value })}
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Email"
                            />
                          

                            <input
                                type="text"
                                value={updateuser.contact?.phone}
                                onChange={(e) =>
                                    setUpdateduser({
                                        ...updateuser,
                                        contact: { ...updateuser.contact, phone: e.target.value },
                                    })
                                }
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Phone"
                            />
                            <input
                                type="text"
                                value={updateuser.contact?.address}
                                onChange={(e) =>
                                    setUpdateduser({
                                        ...updateuser,
                                        contact: { ...updateuser.contact, address: e.target.value },
                                    })
                                }
                                className="w-full border border-gray-300 p-2 rounded"
                                placeholder="Address"
                            />
                        </div>

                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto mt-8 flex overflow-x-auto scrollbar-hide">
                {['personal', 'medical', 'appointments', 'billing'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center px-6 py-4 font-medium transition-all ${activeTab === tab
                            ? 'border-b-4 border-blue-600 text-blue-600 bg-white shadow-sm'
                            : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        {tab === 'appointments' && <FaCalendarCheck className="mr-2" />}
                        {tab === 'billing' && <FaFileInvoice className="mr-2" />}
                        {tab === 'medical' && <FaStethoscope className="mr-2" />}
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {activeTab === "appointments" && (
                <div className="max-w-6xl mx-auto mt-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Your Appointments</h2>
                        <button onClick={() => router("/doctors")} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center">
                            <FaPlus className="mr-2" /> New Appointment
                        </button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {appointments.length > 0 ? (
                            appointments.map((apt, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow relative">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{apt.doctor.name}</h3>
                                                <p className="text-sm text-gray-500">{apt.doctor.specialization}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-sm ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                {apt.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <FaCalendarCheck className="mr-2 text-blue-600" />
                                            <span>{new Date(apt.date).toLocaleDateString()}</span>
                                        </div>

                                        <button className="w-full flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100" onClick={() => router(`/appointment-details/${apt._id}`)}>
                                            View Details
                                            <RiArrowDropRightLine className="text-xl" />
                                        </button>
                                        {apt.status === "accepted" && (
                                            <div className="absolute top-4 right-4">
                                                {apt.certificate?.approved && apt.certificate?.url ? (
                                                    <a
                                                        href={`${BASE_URL}${apt.certificate.url}`}
                                                        download={`certificate-${apt._id}.pdf`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center"
                                                    >
                                                        <FaDownload className="mr-2" />
                                                        Download Certificate
                                                    </a>
                                                ) : apt.certificate?.requested ? (
                                                    <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center cursor-not-allowed">
                                                        <FaFileAlt className="mr-2" />
                                                        Pending Request
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => requestCertificate(apt._id)}
                                                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
                                                    >
                                                        <FaFileAlt className="mr-2" />
                                                        Generate Certificate
                                                    </button>
                                                )}
                                            </div>
                                        )}


                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">No upcoming appointments</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;