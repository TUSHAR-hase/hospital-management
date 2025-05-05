import logo from '../../assets/images/WhatsApp Image 2025-01-28 at 22.18.17_af04ff6a.jpg'
// Add a default profile image
import React, { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../config';
import { useLocation } from 'react-router-dom';

const Headers = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [profileimg, setprofileimg] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const userid = localStorage.getItem("userid");
  const doctorid = localStorage.getItem("doctorid");
  const role = localStorage.getItem("role");
  const [login, setlogin] = useState(false);
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const profileButtonRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const headerstivkeyhandel = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("header").style.top = "-80px";
      } else {
        document.getElementById("header").style.top = "0px";
      }
    })
  }

  useEffect(() => {
    headerstivkeyhandel();
    const token = localStorage.getItem("token");

    if (doctorid && userid) {
      alert("Sorry, User Already Exist Logout Please....");
    }

    if (token && userid) {
      setUser({ id: userid, role: 'patient' });
      navigate(`/home/${userid}`);
    }
    if (doctorid && token) {
      setUser({ id: doctorid, role: 'doctor' });
      navigate(`/doctordeshboard/${doctorid}`);
    }

    const handleClickOutside = (event) => {
      if (profileButtonRef.current && 
          !profileButtonRef.current.contains(event.target) &&
          profileDropdownRef.current && 
          !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
         
            const data = await res.json();
            if (res.ok ) {
                setprofileimg(data.getuserdetail?.image);
               
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };
    fetchUser();
}, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("role")
    localStorage.removeItem("doctorid");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="h-20 py-0 bg-blue-600 text-white font-bold text-1xl p-0 w-full fixed top-0 left-0 right-0 z-40" id="header">
      <div className="px-4 flex items-center justify-between py-4 md:px-8">
        {/* Logo */}
        <NavLink to="/sidebar" className="text-2xl font-bold flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
          <span className="font-serif text-2xl text-white">MyHospital</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 ml-15">
          <NavLink
            to={`/home/${user?.id}`}
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold text-lg" : "hover:text-blue-300 text-lg"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold text-lg" : "hover:text-blue-300 text-lg"
            }
          >
            Doctors
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold text-lg" : "hover:text-blue-300 text-lg"
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contect"
            className={({ isActive }) =>
              isActive ? "text-blue-300 font-semibold text-lg" : "hover:text-blue-300 text-lg"
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Profile Dropdown */}
        {user ? (
          <div className="hidden md:block relative">
            <button
              ref={profileButtonRef}
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <img
                src={profileimg}
                className="h-12 w-12 rounded-full object-cover border-2 border-blue-200 transition-all duration-300 group-hover:border-blue-400 group-hover:scale-105"
                alt="Profile"
              />
            </button>
            {isProfileDropdownOpen && (
              <div
                ref={profileDropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
              >
                <div className="px-4 py-2 text-gray-800">
                  <p className="font-semibold">Welcome, {user.role}</p>
                </div>
                <NavLink
                  to={user.role === 'doctor' 
                    ? `/doctor/profile/${user.id}` 
                    : `/profile/${user.id}`}
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                  onClick={() => setIsProfileDropdownOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
          onClick={() => {
            const targetPath = isLoginPage ? '/register' : '/login';
            navigate(targetPath);
          }}
          className="hidden md:block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100"
        >
          {isLoginPage ? 'Sign Up' : 'Login'}
        </button>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block md:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-600">
          <NavLink
            to={`/home/${user?.id}`}
            className="block px-4 py-2 text-white hover:bg-blue-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className="block px-4 py-2 text-white hover:bg-blue-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Doctors
          </NavLink>
          <NavLink
            to="/services"
            className="block px-4 py-2 text-white hover:bg-blue-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </NavLink>
          <NavLink
            to="/contect"
            className="block px-4 py-2 text-white hover:bg-blue-500"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </NavLink>

          {user && (
            <>
              {user.role === 'doctor' && (
                <NavLink
                  to={`/doctordeshboard/${user.id}`}
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              )}
              {user.role === 'patient' && (
                <NavLink
                  to={`/profile/${user.id}`}
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>
              )}
              {user.role === 'receptionist' && (
                <NavLink
                  to={`/receptionistdashboard/${user.id}`}
                  className="block px-4 py-2 text-white hover:bg-blue-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Receptionist Dashboard
                </NavLink>
              )}
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <NavLink
            to={isLoginPage ? '/register' : '/login'}
            className="block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {isLoginPage ? 'Sign Up' : 'Login'}
          </NavLink>
          )}
        </div>
      )}
    </header>
  )
}

export default Headers;