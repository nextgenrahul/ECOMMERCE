import React from 'react';
import { assets } from '../assets/images/assets';

const Image = () => {
  return (
    <section className="w-full bg-white px-6 md:px-12 max-w-[1600px] mx-auto py-8">
      {/* Precision Editorial Asset Canvas */}
      <div className="relative w-full aspect-[16/6] md:aspect-[21/7] bg-neutral-100 overflow-hidden group border border-neutral-100">
        
        {/* Full-bleed Banner Asset */}
        <img
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-102 filter grayscale contrast-105"
          src={assets.banner}
          alt="Studio Curation Banner Archive"
          loading="lazy"
        />

        {/* Minimal Editorial Sub-Text Overlay */}
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 text-white mix-blend-difference pointer-events-none">
          <span className="text-[9px] font-black tracking-[0.4em] uppercase opacity-60">
            SYS.RUN // PRD-04
          </span>
        </div>

        {/* High-Contrast Spatial Frame Accent */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-10 text-[9px] font-black tracking-widest text-black mix-blend-difference opacity-40 uppercase hidden sm:block">
          [ ARCHIVE EDITION ]
        </div>

      </div>
    </section>
  );
};

export default Image;