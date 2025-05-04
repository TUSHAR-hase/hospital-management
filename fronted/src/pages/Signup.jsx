// import { useState } from 'react';
// import 'animate.css';
// import loginGif from '../assets/images/signup.gif';  // Replace with your Login GIF path
// import registerGif from '../assets/images/signup.gif'; // Replace with your Register GIF path
import { Navigate, Router, useNavigate } from 'react-router-dom';
import uplodecloudnery from '../util/uplodecloudnery.js';
import { BASE_URL } from '../../config.js';

import { useState } from 'react';
import { FiUser, FiMail, FiLock, FiPhone, FiHome, FiCamera, FiArrowRight } from 'react-icons/fi';
import { MdOutlineWork, MdOutlineVerifiedUser } from 'react-icons/md';

const Register = ({ onSwitchToLogin }) => {
  // ... existing state and logic ...
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [gender, setGender] = useState('male');
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [contact, setcontact] = useState('');
  const [address, setAddress] = useState('');
  const nevigate=useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!name || !email || !password || !selectedFile) {
      alert('Please fill out all fields and upload an image.');
    } else {
      alert('Registered successfully!');
      console.log(formData);
    }

    try {
      const res=await fetch(`${BASE_URL}/api/v1/auth/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name,
          email,
          password,
          role,
          gender,
          image: selectedFile,
          contact: {
            phone: contact,   // Ensure phone is defined
            address: address,  // Ensure address is defined
          },


        }),


      });
      const data=await res.json();
      console.log(data);
      if (res.ok) {
        alert("Otp sent on Email ");
      nevigate("/otpverification/"+email); 
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      
    }
  };


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setImage(file);
      console.log("Uploading image...");
  
      try {
        const uploadedImageUrl = await uplodecloudnery(file);
        console.log("Image uploaded:", uploadedImageUrl);
  
        if (!uploadedImageUrl) {
          alert("Image upload failed. Try again.");
          return;
        }
  
        setSelectedFile(uploadedImageUrl);
        setFormData((prev) => ({ ...prev, image: uploadedImageUrl }));
      } catch (err) {
        console.error("Image upload error:", err);
        alert("Image upload failed.");
      }
    }
  };
  const loginpage=()=>{
    nevigate("/login")
    console.log(formData)

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Decorative Gradient */}
          <div className="md:w-1/3 bg-gradient-to-b from-indigo-600 to-blue-500 p-8 hidden md:flex flex-col justify-between">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-8">
                <MdOutlineVerifiedUser className="w-8 h-8" />
                <span className="text-xl font-bold">HealthHub</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
              <p className="text-sm opacity-90">Start your journey with us by creating your secure account</p>
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <FiArrowRight className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="md:w-2/3 p-8 md:p-10 space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Create New Account</h1>
              <p className="text-gray-500 text-sm">Please fill in the form to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Contact Input */}
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setcontact(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Address Input */}
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                  <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {['patient'].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`flex items-center justify-center gap-2 p-2 rounded-lg text-sm ${
                        role === r
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } transition-all`}
                    >
                      <MdOutlineWork className="w-4 h-4" />
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <div className="flex gap-2">
                  {['male', 'female', 'other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`flex-1 p-2 rounded-md text-xs font-medium ${
                        gender === g
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      } transition-all`}
                    >
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="hidden"
                    accept="image/*"
                  />
                  <div className="flex flex-col items-center text-gray-500">
                    <FiCamera className="w-6 h-6 mb-1" />
                    <span className="text-xs">
                      {selectedFile ? 'Change Photo' : 'Click to Upload'}
                    </span>
                  </div>
                </label>
                {selectedFile && (
                  <div className="mt-1 text-center">
                    <span className="text-xs text-green-600">✓ Photo Selected</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Register Now
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600 mt-4">
              Already registered?{' '}
              <button
                onClick={loginpage}
                className="text-indigo-600 font-semibold hover:underline"
              >
                Sign In Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;