import { useState, useEffect } from "react";
import { BASE_URL } from "../../config";
import { Calendar, Clock, CheckCircle, XCircle, Download } from "lucide-react";

import jsPDF from "jspdf";

const DoctorDashboard = () => {

  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedDoctor, setUpdatedDoctor] = useState([]);
  const [loading, setLoading] = useState({});
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [certificateStatus, setCertificateStatus] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  // const [updatedDoctor, setUpdatedDoctor] = useState(doctor); 
  useEffect(() => {

    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const doctorid = localStorage.getItem("userid")
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/v1/doctors/singledoctor/${doctorid}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const appoinmentdata = await fetch(`${BASE_URL}/api/v1/appoinment/getappoinmentbydoctorid/${doctorid}`);
      const appoinment = await appoinmentdata.json();
      console.log(appoinment)
      const data = await res.json();
      console.log(`responce data ${data.getdoctordetail}`)
      if (res.ok) {
        setDoctor(data.getdoctordetail);
        setAppointments(appoinment);
        setUpdatedDoctor(data.getdoctordetail);
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

// console.log(updatedDoctor)
  const [generatingCertificates, setGeneratingCertificates] = useState({});





  const handleStatusChange = async (id, status) => {
    try {
      setLoading(prev => ({ ...prev, [id]: true }));

      const res = await fetch(`${BASE_URL}/api/v1/appoinment/put/${id}/${status}`, {
        method: "PUT"
      });

      if (res.ok) {
        setAppointments(prev => prev.map(apt =>
          apt._id === id ? { ...apt, status } : apt
        ));

        if (status === 'accepted') {
          await handleGenerateCertificate(id);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleGenerateCertificate = async (id) => {
    try {
      setCertificateStatus(prev => ({ ...prev, [id]: "generating" }));
      const appointment = appointments.find(a => a._id === id);
      if (!appointment) return;

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });
// Solid Background Color (Fixed)
doc.setFillColor(248, 249, 250); // Light Gray Color
doc.rect(0, 0, 297, 210, 'F');  // Fill the entire background


    // Decorative border
    doc.setDrawColor(64, 84, 178);
    doc.setLineWidth(8);
    doc.rect(10, 10, 277, 190);

    // Gold accent line
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(3);
    doc.line(30, 50, 267, 50);

    // Certificate Header
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(33, 37, 41);
    doc.text("CERTIFICATE OF ACHIEVEMENT", 148, 40, { align: "center" });

    // Main Content
    doc.setFontSize(18);
    doc.setTextColor(108, 117, 125);
    doc.text("This is to certify that", 148, 70, { align: "center" });

    // Recipient Name
    doc.setFontSize(28);
    doc.setFont("times", "bold");
    doc.setTextColor(64, 84, 178);
    doc.text(appointment.patient?.name.toUpperCase() || "N/A", 148, 90, { align: "center" });

    // Achievement Statement
    doc.setFontSize(16);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(73, 80, 87);
    doc.text("has successfully completed the medical consultation with excellence", 148, 110, { align: "center" });

    // Medical Icon
    const medicalSymbol = "+"; // Replace with actual icon if available
    doc.setFontSize(48);
    doc.setTextColor(212, 175, 55);
    doc.text(medicalSymbol, 148, 130, { align: "center" });

    // Details Section
    let yPos = 150;
    const details = [
        { label: "Attending Physician:", value: doctor?.name || "N/A" },
        { label: "Consultation Date:", value: new Date(appointment.date).toLocaleDateString() },
        { label: "Presenting Symptoms:", value: appointment.symptoms || "N/A" },
        { label: "Session Duration:", value: appointment.timeSlot || "N/A" }
    ];

    details.forEach(({ label, value }) => {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(64, 84, 178);
        doc.text(label, 60, yPos);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(33, 37, 41);
        doc.text(value, 140, yPos);
        yPos += 10;
    });
// Signature Section (Bottom-right aligned)
const signatureX = 265;
const signatureLineWidth = 60;
const signatureY = 170;

// Draw signature line
doc.setDrawColor(64, 84, 178);
doc.setLineWidth(1);
doc.line(signatureX - signatureLineWidth, signatureY, signatureX, signatureY);

// "Dr. Name" and other signature texts under the line
doc.setFontSize(12);
doc.setFont("helvetica", "normal");
doc.setTextColor(108, 117, 125);
doc.text("Authorized Signature", signatureX, signatureY + 6, { align: "right" });

doc.setFont("times", "bold");
doc.setFontSize(12);
doc.setTextColor(33, 37, 41);
doc.text(`Dr. ${doctor?.name || ""}`, signatureX, signatureY + 13, { align: "right" });

doc.setFont("helvetica", "normal");
doc.setFontSize(10);
doc.text("Board Certified Physician", signatureX, signatureY + 18, { align: "right" });

    // // Signature Section
    // doc.setDrawColor(64, 84, 178);
    // doc.setLineWidth(1);
    // doc.line(200, 170, 260, 170);
    // doc.setFontSize(12);
    // doc.setTextColor(108, 117, 125);
    // doc.text("Authorized Signature", 230, 175, { align: "right" });
    
    // doc.setFont("times", "bold");
    // doc.setTextColor(33, 37, 41);
    // doc.text(`Dr. ${doctor?.name || ""}`, 230, 182, { align: "right" });
    // doc.setFontSize(10);
    // doc.text("Board Certified Physician", 230, 187, { align: "right" });

    // Security Footer
    doc.setFontSize(8);
    doc.setTextColor(173, 181, 189);
    doc.text("Certificate ID: MED-CERT-" + appointment._id.slice(-6).toUpperCase(), 20, 195);
    doc.text("Issued: " + new Date().toLocaleDateString(), 20, 200);
    doc.text("This document is electronically verifiable", 148, 200, { align: "center" });

      const pdfBlob = doc.output("blob");  // Get the PDF as a Blob
      const pdfFile = new File([pdfBlob], `medical-certificate-${appointment._id}.pdf`, { type: "application/pdf" });

      const formData = new FormData();
      formData.append("certificate", pdfFile);
      // console.log(appointment)
      console.log("Uploading Certificate...");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const uploadRes = await fetch(`${BASE_URL}/api/v1/upload-certificate/${appointment.patient._id}`, {
        method: "POST",
        body: formData
      });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const { url } = await uploadRes.json();

      const updateapprove = await fetch(`${BASE_URL}/api/v1/appoinment/updateapprove/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ url })
      });
      // Save URL to appointment
      console.log(updateapprove)
      const updateRes = await fetch(`${BASE_URL}/api/v1/appoinment/updateurl/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ url })
      });

      console.log(updateRes)
      if (updateRes.ok) {
        setAppointments(prev => prev.map(a =>
          a._id === id ? { ...a, url } : a
        ));
        setCertificateStatus(prev => ({ ...prev, [id]: "generated" }));
      }
    } catch (error) {
      console.error("Certificate generation failed:", error);
      setCertificateStatus(prev => ({ ...prev, [id]: "failed" }));
    }
  };
  const renderCertificateSection = (appointment) => {
    if (!appointment || !appointment.certificate) return null;

    const { approved, url } = appointment.certificate;

    // Ensure only confirmed/completed appointments can show certificates
    if (!["accepted", "Completed"].includes(appointment.status)) return null;

    return (
      <div className="mt-3 space-y-2">
        {approved && url ? (
          <a
            href={`${BASE_URL}${appointment.certificate.url}`}
            download={`certificate-${appointment._id}.pdf`}
             target="_blank"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={16} />
            Download Certificate
          </a>
        ) : (
          <button
            onClick={() => handleGenerateCertificate(appointment._id)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Generate Certificate
          </button>
        )}
      </div>
    );
  
  };
  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/doctors/updatedoctor/${doctor._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDoctor),
      });

      const data = await response.json();
      console.log("Server response:", data);
      setShowEditModal(false);
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
        setUpdatedDoctor((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file); // base64
    }
  };

  // Rest of the component remains the same...

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <img
              src={doctor?.image || "/default-doctor.png"}
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
              alt="Profile"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{doctor?.name}</h1>
              <p className="text-lg text-blue-600 font-medium">{doctor?.specialization}</p>
              <div className="flex gap-4 mt-2 text-gray-600">
                <span>📞 {doctor?.contact.phone}</span>
                <span>📍 {doctor?.contact.address}</span>
              </div>
            </div>
            <button
      onClick={() => setShowEditModal(true)} // Replace with your actual handler
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
    >
      Update Profile
    </button>
          </div>
        </div>
        {showEditModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
      <h2 className="text-xl font-bold mb-4">Edit Doctor Profile</h2>
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

          {updatedDoctor.image && (
            <img
              src={updatedDoctor.image}
              alt="Preview"
              className="w-20 h-20 mt-2 rounded-full object-cover"
            />
          )}
        </div>

        <input
          type="text"
          value={updatedDoctor.name}
          onChange={(e) => setUpdatedDoctor({ ...updatedDoctor, name: e.target.value })}
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Name"
        />
        <input
          type="text"
          value={updatedDoctor.specialization}
          onChange={(e) =>
            setUpdatedDoctor({ ...updatedDoctor, specialization: e.target.value })
          }
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Specialization"
        />
        <input
          type="text"
          value={updatedDoctor.contact?.phone}
          onChange={(e) =>
            setUpdatedDoctor({
              ...updatedDoctor,
              contact: { ...updatedDoctor.contact, phone: e.target.value },
            })
          }
          className="w-full border border-gray-300 p-2 rounded"
          placeholder="Phone"
        />
        <input
          type="text"
          value={updatedDoctor.contact?.address}
          onChange={(e) =>
            setUpdatedDoctor({
              ...updatedDoctor,
              contact: { ...updatedDoctor.contact, address: e.target.value },
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


        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Sidebar Details */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Availability</h3>
              <div className="space-y-3">
                {doctor?.availability.days.map(day => (
                  <div key={day} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{day}</span>
                    <div className="text-sm text-gray-600">
                      {doctor?.availability.timeSlots.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Experience</span>
                  <span className="font-bold text-blue-600">{doctor?.experience}+ years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Appointments</span>
                  <span className="font-bold text-blue-600">{appointments.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}

          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h2>
            <div className="space-y-4">
              {appointments.map(appointment => (
                <div key={appointment._id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.patient?.name}</h3>
                      <p className="text-gray-600">{appointment.symptoms}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                      }`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-500">
                      <Calendar size={16} className="mr-2" />
                      <span>{new Date(appointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock size={16} className="mr-2" />
                      <span>{appointment.timeSlot}</span>
                    </div>
                  </div>

                  {appointment.status === 'Pending' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleStatusChange(appointment._id, 'accepted')}
                        disabled={loading[appointment._id]}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
                      >
                        {loading[appointment._id] ? 'Processing...' : 'Accept'}
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment._id, 'rejected')}
                        disabled={loading[appointment._id]}
                        className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {renderCertificateSection(appointment)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}
export default DoctorDashboard