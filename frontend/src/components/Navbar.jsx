import React from "react";
import { assets } from "../assets/images/assets.js";
import {useNavigate} from "react-router-dom";
const Navbar = () => {
  const naviage = useNavigate();
  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logoIcon} alt="" />
      <button onClick={() => naviage("/login")} className="flex items-center gap-2 border border-black-500 rounded-full px-8 py-2 text-gray-800 hover:bg-gray-100 transition-all">
        Login
        <img src={assets.arrow_icon} alt="" />
      </button>
    </div>
  );                                
};

export default Navbar;
