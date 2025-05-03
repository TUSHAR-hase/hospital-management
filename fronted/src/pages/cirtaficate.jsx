import { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';

const CertificateGenerator = () => {
  const [patientDetails, setPatientDetails] = useState({
    patientName: '',
    consultationDate: '',
    diagnosis: '',
    doctorName: '',
    additionalNotes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails(prev => ({ ...prev, [name]: value }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header Section
    doc.setFillColor(13, 110, 253);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Hospital Logo
    doc.addImage(
      'https://cdn-icons-png.flaticon.com/512/2967/2967741.png', // Add your logo URL
      'PNG',
      10,
      5,
      20,
      20
    );

    // Header Text
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text('Sunrise Medical Center', 105, 20, { align: 'center' });

    // Main Title
    doc.setFontSize(22);
    doc.setTextColor(13, 110, 253);
    doc.text('Medical Certificate', 105, 50, { align: 'center' });

    // Patient Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPos = 70;

    const details = [
      { label: 'Patient Name:', value: patientDetails.patientName },
      { label: 'Consultation Date:', value: new Date(patientDetails.consultationDate).toLocaleDateString() },
      { label: 'Diagnosis:', value: patientDetails.diagnosis },
      { label: 'Physician Name:', value: patientDetails.doctorName },
      { label: 'Additional Notes:', value: patientDetails.additionalNotes },
    ];

    details.forEach(({ label, value }) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 70, yPos);
      yPos += 10;
    });

    // Medical Advice Box
    doc.setDrawColor(13, 110, 253);
    doc.setFillColor(237, 246, 255);
    doc.roundedRect(20, yPos + 10, 170, 40, 3, 3, 'FD');
    
    doc.setFont('helvetica', 'bold');
    doc.text('Medical Advice:', 25, yPos + 20);
    
    doc.setFont('helvetica', 'normal');
    const splitText = doc.splitTextToSize(
      '1. Take prescribed medications regularly\n2. Get adequate rest\n3. Maintain a balanced diet\n4. Contact immediately in emergencies',
      160
    );
    doc.text(splitText, 25, yPos + 30);

    // Signature Section
    // doc.setFont('helvetica', 'bold');
    // doc.text(`Dr. ${patientDetails.doctorName}`, 210, 250);
    // doc.line(210, 255, 240, 255);
    // doc.setFontSize(10);
    // doc.text('(Authorized Signature)', 210, 260);
// Signature Section
doc.setFontSize(10);
doc.setFont('helvetica', 'normal');
doc.text('(Authorized Signature)', 160, 260);

// Signature Line
doc.setDrawColor(13, 110, 253); // blue line
doc.setLineWidth(1);
doc.line(160, 255, 200, 255); // under the signature

// Doctor Name
doc.setFontSize(12);
doc.setFont('helvetica', 'bold');
doc.setTextColor(0, 0, 0);
doc.text(`Dr. ${patientDetails.doctorName}`, 160, 268);

// Title under the name
doc.setFontSize(10);
doc.setFont('helvetica', 'bold');
doc.text('Board Certified Physician', 160, 274);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('This certificate is issued solely for medical record purposes', 105, 280, { align: 'center' });

    doc.save(`medical-certificate-${patientDetails.patientName}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-8">
            Medical Certificate Generator
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={patientDetails.patientName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Consultation Date
                </label>
                <input
                  type="date"
                  name="consultationDate"
                  value={patientDetails.consultationDate}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Physician's Name
                </label>
                <input
                  type="text"
                  name="doctorName"
                  value={patientDetails.doctorName}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Dr. Smith Johnson"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Diagnosis Details
                </label>
                <textarea
                  name="diagnosis"
                  value={patientDetails.diagnosis}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Detailed description of condition"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={patientDetails.additionalNotes}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Special instructions or comments"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={generatePDF}
              disabled={!patientDetails.patientName || !patientDetails.doctorName}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${
                patientDetails.patientName && patientDetails.doctorName
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FaFileDownload className="inline-block mr-2" />
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateGenerator;