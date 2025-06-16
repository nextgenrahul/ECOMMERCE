import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import EmailVerify from "../pages/EmailVerify";
import ResetPassword from "../pages/ResetPassword";
import Home from "../pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHome from "../pages/MainHome";
import Collection from "../pages/Collection";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Products from "../pages/Products";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <MainNavbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Frontend Route */}
        <Route path="/" element={<MainHome />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Products />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRoutes;
