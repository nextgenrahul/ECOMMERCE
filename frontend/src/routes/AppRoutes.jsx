import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmailVerify from "../pages/EmailVerify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainHome from "../pages/MainHome";
import Collection from "../pages/Collection";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Product from "../pages/Product";
import MainNavbar from "../components/MainNavbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import PlaceOrder from "../pages/PlaceOrder";
import Order from "../pages/Order";
import NewLogin from "../pages/NewLogin";
import TrackOrder from "../pages/TrackOrder";
import Verify from "../pages/Verify";
import NotFound from "../components/NotFound";
import ResetPassword from "../pages/ResetPassword";
import FloatingInput from "../pages/FloatingInput";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <MainNavbar />
      <SearchBar />
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<MainHome />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/trackOrder" element={<TrackOrder />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/emailverify" element={<EmailVerify />}/>
        <Route path="/resetpass" element={<ResetPassword />}/>
        <Route path="/my" element={<FloatingInput />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default AppRoutes;
