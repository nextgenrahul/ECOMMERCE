import React from "react";
import Lottie from "lottie-react"; 
import loadingAnimation from "../assets/reloading.json"; 

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-1 flex items-center justify-center z-50">
      <div className="w-62 h-62">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
