import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = ({ 
  text1 = "ERROR CODE // 404", 
  text2 = "The requested navigation matrix address does not exist within our active production catalog index." 
}) => {
  const navigate = useNavigate();

  return (
    <section className="min-h-[70vh] flex items-center justify-between px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black relative overflow-hidden">
      
      {/* Left Column: Core Typographic Status */}
      <div className="max-w-xl flex flex-col items-start text-left space-y-6 z-10 py-12">
        
        {/* Personalized Status Ribbon */}
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">
            ROUTING FAULT DETECTED
          </span>
        </div>

        {/* Heavyweight Monolithic Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
            {text1}
            <span className="text-neutral-200">.</span>
          </h1>
          <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium max-w-sm">
            {text2}
          </p>
        </div>

        {/* Premium Core Action Button */}
        <button 
          onClick={() => navigate("/")}
          className="group flex items-center gap-4 border-2 border-black bg-black text-white px-8 py-3 text-xs font-black tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black"
        >
          <span>RETURN TO BASE</span>
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
        </button>
      </div>

      {/* Right Column: Abstract Architectural Empty background indicator */}
      <div className="hidden lg:flex flex-col items-end justify-center w-1/3 h-full select-none pointer-events-none opacity-[0.03]">
        <span className="text-[20vw] font-black tracking-tighter text-black select-none leading-none">
          404
        </span>
      </div>

    </section>
  );
};

export default NotFound;