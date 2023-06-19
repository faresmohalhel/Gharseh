import { useContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import './App.css'
import Layout from './layout/layout';
import Userprofile from './pages/Userprofile';
import Signup from './regesration/Signup';
import Login from './regesration/Login';
import ForgotPassword from './regesration/forgotPassword';
import ResetPassword from './regesration/resetPassword';
import Payment from './components/Payment/payment';
import Services from './pages/Services';
import About from './pages/About';
import ContactUs from './pages/Contact';
import Details from './pages/Details';
import Home from './pages/Home';
import { AuthContext } from './Context/AuthContext';
import { useState } from 'react';

function App() {
  const { auth } = useContext(AuthContext)
  const [hideNav, setHideNav] = useState(false)

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  return (
    <>
      <BrowserRouter>
      {auth? <>
      <ScrollToTop />
        <Layout hideNav={hideNav} setHideNav={setHideNav}>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path="/Signup" element={<Home />} />
            <Route path="/Login" element={<Home />} />
            <Route path="/ForgotPassword" element={<Home />} />
            <Route path="/Passwordrest/:resetToken" element={<Home />} />
            <Route path="/Payment/:id" element={<Payment />} />
            <Route path='/userprofile/:id' element={<Userprofile hideNav={hideNav} setHideNav={setHideNav} />} />
            <Route path="/About" element={<About />} />
            <Route path='/Contact' element={<ContactUs />} />
            <Route path='/Details/:id' element={<Details />} />
          </Routes >
        </Layout >
        </>
        :<> 
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/Passwordrest/:resetToken" element={<ResetPassword />} />
            <Route path="/Payment/:id" element={<Payment />} />
            <Route path='/userprofile/:id' element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path='/Contact' element={<ContactUs />} />
            <Route path='/Details/:id' element={<Details />} />
          </Routes >
        </Layout >
        </>}
      </BrowserRouter >
    </>
  )
}

export default App
