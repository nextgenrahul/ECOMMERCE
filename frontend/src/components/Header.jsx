import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/images/assets.js";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  const navigate = useNavigate();

  // Clean formatting for user name string
  const formattedName = userData?.name
    ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
    : "GUEST";

  return (
    <section className="min-h-[85vh] flex items-center justify-between px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black relative overflow-hidden">
      
      {/* Left Column: Core Editorial Text & Control Action */}
      <div className="max-w-2xl flex flex-col items-start text-left space-y-8 z-10 py-12">
        
        {/* Personalized Status Ribbon */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">
            STATUS // ACCESSED AS {formattedName}
          </span>
          <img 
            src={assets.hand_wave} 
            alt="wave" 
            className="w-4 h-4 object-contain opacity-70 animate-[bounce_2s_infinite]" 
          />
        </div>

        {/* Dynamic Heavyweight Headlines */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.95]">
            ESSENTIAL <br />
            EDITIONS<span className="text-neutral-200">.</span>
          </h1>
          <h2 className="text-lg md:text-xl font-medium tracking-wide text-neutral-400 font-sans normal-case">
            Intentionally built functional staples, curated by AI intelligence.
          </h2>
        </div>

        {/* Explanatory Paragraph Context */}
        <p className="text-xs tracking-wide leading-relaxed text-neutral-500 max-w-md font-medium">
          Welcome to the next generation of digital commerce. Take a brief structural tour through our automated matrix or explore the raw catalog grid directly.
        </p>

        {/* Premium Action Button Interaction */}
        <button 
          onClick={() => navigate("/collection")}
          className="group flex items-center gap-4 border-2 border-black bg-black text-white px-8 py-3 text-xs font-black tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black hover:px-10"
        >
          <span>GET STARTED</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">❯</span>
        </button>
      </div>

      {/* Right Column: Abstract Architectural Empty space or Future Hero Asset container */}
      <div className="hidden lg:flex flex-col items-end justify-center w-1/3 h-full relative opacity-10 select-none pointer-events-none">
        <span className="text-[14vw] font-black text-neutral-200 tracking-tighter leading-none uppercase select-none">
          [01]
        </span>
      </div>

    </section>
  );
};

export default Header;