import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  const userid = localStorage.getItem("userid");

  return (
    <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Us Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">About Us</h3>
          <p className="text-gray-400 text-sm">
            MY Hospital is a leading healthcare provider committed to delivering high-quality medical services. Our experienced staff works with dedication to ensure the best care for all patients.
          </p>
        </div>
  
        {/* Quick Links Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to={`/home/${userid}`} className="text-gray-400 hover:text-blue-500">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-gray-400 hover:text-blue-500">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/services" className="text-gray-400 hover:text-blue-500">Services</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-gray-400 hover:text-blue-500">Contact Us</NavLink>
            </li>
          </ul>
        </div>
  
        {/* Contact Us Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">Contact Us</h3>
          <p className="text-gray-400 text-sm mb-2">Phone: (123) 456-7890</p>
          <p className="text-gray-400 text-sm mb-2">Email: contact@hospital.com</p>
          <p className="text-gray-400 text-sm">Address: 123 Main St, City, State, ZIP</p>
        </div>
  
        {/* Newsletter Section */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-300 mb-4">Subscribe to Our Newsletter</h3>
          <p className="text-gray-400 text-sm mb-4">Stay updated with the latest news and offers from [Hospital Name].</p>
          <div className="flex">
            <input
              type="email"
              className="w-full px-4 py-2 text-gray-800 rounded-l-md focus:outline-none"
              placeholder="Enter your email"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none">
              Subscribe
            </button>
          </div>
        </div>
  
      </div>
      
      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} [Hospital Name]. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
  
  )
}

export default Footer