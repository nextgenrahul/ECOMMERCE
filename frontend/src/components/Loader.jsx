import React from "react";
import Lottie from "lottie-react"; 
import loadingAnimation from "../assets/reloading.json"; 

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center gap-4 transition-all duration-300">
      
      {/* Structural Minimal Animation Asset Container */}
      <div className="w-16 h-16 opacity-90 filter grayscale contrast-200">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>

      {/* Editorial System Ticker */}
      <div className="flex items-center gap-2">
        <span className="h-1 w-1 bg-black rounded-full animate-ping" />
        <span className="text-[9px] font-black tracking-[0.4em] uppercase text-black">
          LOADING SYSTEM MATRIX
        </span>
      </div>

    </div>
  );
};

export default Loader;