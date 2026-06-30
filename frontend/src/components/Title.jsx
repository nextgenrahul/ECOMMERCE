import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col items-start text-left mb-6 space-y-1">
      {/* Structural Indicator Prefix */}
      <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block">
        SYSTEM MATRIX INDEX
      </span>
      
      {/* Heavy Asymmetric Headlines */}
      <h2 className="text-2xl sm:text-3xl font-black tracking-tighter uppercase text-black flex items-center gap-2">
        <span>{text1}</span>
        <span className="font-light text-neutral-400">{text2}</span>
        <span className="text-neutral-300 font-normal tracking-normal ml-1">//</span>
      </h2>
    </div>
  );
};

export default Title;