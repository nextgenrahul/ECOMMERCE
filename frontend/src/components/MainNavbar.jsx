import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/images/assets.js";
import { AppContext } from "../context/AppContext";

const MainNavbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    showSearch,
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(AppContext);
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className="flex items-center justify-between py-5 font-medium shadow-full">
      <Link to="/">
        <img src={assets.logo_icon} className="w-10" alt="" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none  h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none  h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none  h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none  h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/trackOrder" className="flex flex-col items-center gap-1">
          <p>Track Order</p>
          <hr className="w-2/4 border-none  h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(!showSearch)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
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
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/*  Sidebar menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 cursor-pointer">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p className="">Back</p>
          </div>
          <NavLink
            className="py-2 pl-6 border-t border-gray-400 "
            onClick={() => setVisible(false)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="py-2 pl-6 border-t border-gray-400 "
            onClick={() => setVisible(false)}
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            className="py-2 pl-6 border-t border-gray-400 "
            onClick={() => setVisible(false)}
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            className="py-2 pl-6 border border-gray-400 "
            onClick={() => setVisible(false)}
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
