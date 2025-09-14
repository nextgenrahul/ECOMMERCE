import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/images/assets.js";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MainNavbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    showSearch,
    setShowSearch,
    getCartCount,
    navigate,
    setCartItems,
    isLoggedin,
    backendUrl,
    setIsLoggedin,
    userName,
  } = useContext(AppContext);

  const logout = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        setIsLoggedin(false);
        setCartItems({});
        toast.success("User Logout Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="relative z-50 flex items-center justify-between py-5 font-medium shadow-full 
      bg-gradient-to-t from-[#a4b9d8] to-[#ffffff] px-10">
      <Link to="/">
        <img src={assets.logo_icon} className="w-10" alt="Logo" />
      </Link>

      {/* Desktop Nav Menu */}
      <ul className="hidden sm:flex gap-6 text-sm text-white font-medium">
        {[
          { path: "/", label: "Home" },
          { path: "/collection", label: "Collection" },
          { path: "/about", label: "About" },
          { path: "/contact", label: "Contact" },
          { path: "/trackOrder", label: "Track Order" },
        ].map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 transition-colors duration-300 ${isActive
                ? "text-[#C19A6B]"
                : "text-black hover:text-[#C19A6B]"}`
            }
          >
            <p>{label}</p>
          </NavLink>
        ))}
      </ul>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(!showSearch)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search"
        />

        {/* Profile Dropdown */}
        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />
          {isLoggedin ? (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-800 rounded shadow-md">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">
                  {userName.email}
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
                <Link to={"/login"} className="cursor-pointer hover:text-black">
                  Log In
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-6 h-6 min-w-5 object-contain transition-transform duration-200 group-hover:scale-110"
            alt="Cart"
          />
          <p className="absolute -bottom-1 -right-1 bg-black text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>

      {/* Sidebar for Mobile */}
      {visible && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Overlay */}
          <div
            onClick={() => setVisible(false)}
            className="flex-1 bg-black bg-opacity-50"
          ></div>

          {/* Sidebar Menu */}
          <div className="w-64 h-full bg-gradient-to-t from-[#1f2937] to-[#4b5563] text-white overflow-y-auto">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3 border-b border-gray-500"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt="Back"
              />
              <p>Close</p>
            </div>

            <div className="flex flex-col">
              {[
                { path: "/", label: "Home" },
                { path: "/collection", label: "Collection" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
                { path: "/trackOrder", label: "Track Order" },
              ].map(({ path, label }) => (
                <NavLink
                  key={path}
                  className="py-3 pl-6 border-b border-gray-600"
                  onClick={() => setVisible(false)}
                  to={path}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainNavbar;
