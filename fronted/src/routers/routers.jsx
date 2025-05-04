import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import doctor from '../pages/doctor'
import doctordetail from '../pages/doctordetail'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Doctor from '../pages/doctor'
import Doctordetail from '../pages/doctordetail'
import Contect from '../pages/contect'
import ServicesPage from '../pages/service'
import FindDoctors from '../pages/doctor'
import AuthPage from '../pages/loginhandal'
import AppointmentPage from '../pages/appoinment'
import ProfilePage from '../pages/Profile_page'
import AddDoctorForm from '../pages/adddoctor'
import DoctorDashboard from '../pages/doctordeshboard'
import OtpPage from '../pages/otppage'
import SideNavbar from '../pages/sidebar'
import OtpPage_doctor from '../pages/doctorverifyotp'
import CertificateGenerator from '../pages/cirtaficate'


const Routerss = () => {
  return <Routes>

    <Route path="/home/:id" element={<Home />} />
    <Route path="/" element={<Home />} />

   <Route path='/profile/:id' element={ <ProfilePage/>}/>
    <Route path="/contect" element={<Contect/>} />
    <Route path="/doctordeshboard/:id" element={<DoctorDashboard/>} />
    <Route path="/otpverification/:email" element={<OtpPage/>} />
    <Route path="/otpchack/:email" element={<OtpPage_doctor/>} />

    <Route path="/certificate_generate" element={<CertificateGenerator />} />

    <Route path="/adddoctor" element={<AddDoctorForm />} />
    <Route path="/login" element={<AuthPage />} />
    <Route path="/register" element={<Signup />} />
    <Route path="/sidebar" element={<SideNavbar />} />

    <Route path="/doctors/" element={<FindDoctors />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/doctordetail/:id" element={<Doctordetail />} />
<Route path='/appointment/:id'element={<AppointmentPage/>}></Route>
    
  </Routes>
}

export default Routerss