import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/images/assets.js";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full bg-white px-6 md:px-12 max-w-[1600px] mx-auto py-4">
      {/* Premium Editorial Layout Frame */}
      <div className="relative w-full h-[70vh] md:h-[80vh] bg-neutral-100 overflow-hidden group">
        
        {/* Full-Frame Hero Asset */}
        <img
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={assets.front2}
          alt="Studio Curation Banner"
        />

        {/* Minimal High-Contrast Overlay Mask */}
        <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-30" />

        {/* Floating Asymmetric Layout Interface */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 text-white z-10">
          <div className="max-w-xl space-y-6">
            
            {/* Context Line Tag */}
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-white" />
              <span className="text-[10px] font-black tracking-[0.3em] uppercase">
                Collection Edition // 01
              </span>
            </div>

            {/* Heavy Monolithic Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              UNCOMPROMISED <br />
              GARMENTS.
            </h1>

            {/* Sub-text context mapping */}
            <p className="text-xs sm:text-sm tracking-wide leading-relaxed text-neutral-200 font-medium max-w-md">
              A precise balancing execution of timeless silhouettes and sharp construction. Intentionally built to endure.
            </p>

            {/* Flat Solid Control Triggers */}
            <div className="pt-2 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate("/collection")}
                className="px-8 py-3 bg-white text-black text-xs font-black tracking-widest uppercase transition-all duration-300 hover:bg-black hover:text-white border border-white"
              >
                SHOP COLLECTION
              </button>
              
              <button 
                onClick={() => navigate("/about")}
                className="px-8 py-3 bg-transparent text-white text-xs font-black tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black border border-white"
              >
                THE JOURNAL
              </button>
            </div>

          </div>
        </div>

        {/* Technical Layout Accent */}
        <div className="absolute top-8 right-8 text-[10px] font-black tracking-widest text-white/40 uppercase hidden sm:block">
          SYS.MAT // CRU-01
        </div>

      </div>
    </section>
  );
};
  
export default Hero;