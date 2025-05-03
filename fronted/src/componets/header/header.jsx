import logo from '../../assets/images/WhatsApp Image 2025-01-28 at 22.18.17_af04ff6a.jpg'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const Headers = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userid = localStorage.getItem("userid");
  const doctorid = localStorage.getItem("doctorid");
  const role = localStorage.getItem("role")
  const [login, setlogin] = useState(false)

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
      setUser(userid);
      navigate(`/home/${userid}`);
    }
    if (doctorid && token) {
      setUser(doctorid);
      navigate(`/doctordeshboard/${doctorid}`);
    }


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
            to={`/home/${user}`}
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


          {role === 'doctor' && (
            <NavLink to={`/doctordeshboard/${user}`} className="hover:text-blue-300 text-lg">
              Doctor Dashboard
            </NavLink>
          )}
          {role === 'patient' && (
            <NavLink to={`/profile/${user}`} className="hover:text-blue-300 text-lg">
              Profile
            </NavLink>
          )}
          {role === 'receptionist' && (
            <NavLink to={`/receptionistdashboard/${user}`} className="hover:text-blue-300 text-lg">
              Receptionist Dashboard
            </NavLink>
          )}
        </nav>


        {/* Login/Logout Button */}
        {user ? (
          <button
            onClick={handleLogout}
            className="hidden md:block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              if (login) {
                navigate("/register");
              } else {
                navigate("/login");  
              }
              setlogin(!login);
            }}
            className="hidden md:block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100"
          >
            {login ? "SignUp" : "login"}
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
          {role === 'doctor' ? (
            <>
              <NavLink
                to={`/doctordeshboard/${user}`}
                className="block px-4 py-2 text-white hover:bg-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </NavLink>
              <NavLink
                to={`/doctor/profile/${user}`}
                className="block px-4 py-2 text-white hover:bg-blue-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </NavLink>
            </>
          ) : (
            <NavLink
              to={`/home/${user}`}
              className="block px-4 py-2 text-white hover:bg-blue-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          )}

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

          {user ? (
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-600"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="block px-4 py-2 text-white bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  )
}

export default Headers;