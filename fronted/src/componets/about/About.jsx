import React from 'react'
import img from '../../assets/images/WhatsApp Image 2025-01-28 at 22.14.58_1649da3b.jpg'
const About = () => {
  return <section className="py-16">
  <div className="container mx-auto px-4 md:px-8">
    <h2 className="text-3xl font-extrabold text-gray-800 text-center tracking-wide md:text-4xl lg:text-5xl transition-all duration-500 ease-in-out hover:text-blue-600">
      About Our Hospital
    </h2>
    <p className="text-gray-600 text-center mt-4 text-lg md:text-xl lg:text-2xl leading-relaxed">
      Welcome to [Hospital Name], where we prioritize your health and well-being. With decades of experience, we are committed to providing compassionate care and state-of-the-art medical services.
    </p>
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Image */}
      <div className="flex justify-center items-center">
        <img
          src={img}
          alt="About Our Hospital"
          className="w-full max-w-md rounded-lg shadow-lg transition-all duration-500 ease-in-out hover:scale-105"
        />
      </div>

      {/* Right: Content */}
      <div className="flex flex-col justify-center items-start">
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 tracking-tight md:text-3xl lg:text-4xl text-left transition-all duration-500 ease-in-out hover:text-blue-600">
          Our Mission
        </h3>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed md:text-xl">
          At [Hospital Name], our mission is to deliver high-quality healthcare services while ensuring that every patient receives personalized, compassionate care. We strive to meet the medical needs of our community with cutting-edge technology and skilled medical professionals.
        </p>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed md:text-xl">
          Our team of doctors, nurses, and support staff work collaboratively to create a safe, healing environment for all our patients. We are committed to not only treating illnesses but also improving the overall well-being of every individual who walks through our doors.
        </p>
        
        <h3 className="text-2xl font-semibold text-gray-800 mt-8 tracking-tight md:text-3xl lg:text-4xl text-left transition-all duration-500 ease-in-out hover:text-blue-600">
          Why Choose Us?
        </h3>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed md:text-xl">
          - Advanced medical technology for accurate diagnoses and effective treatments.<br />
          - A team of experienced and dedicated healthcare professionals.<br />
          - Comprehensive care across various specialties including [List Key Specialties like cardiology, neurology, orthopedics, etc.].<br />
          - Comfortable and modern facilities to make your hospital experience as stress-free as possible.<br />
          - A commitment to providing affordable healthcare to all members of our community.
        </p>
      </div>
    </div>
  </div>
</section>


  
}

export default About