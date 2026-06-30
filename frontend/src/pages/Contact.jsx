import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/images/assets.js';
import NewsLetterBox from '../components/NewsLetterBox.jsx';

const Contact = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto pt-10">
        
        {/* Section Title */}
        <div className="border-t border-neutral-100 pt-8">
          <Title text1="STUDIO" text2="LOCATIONS" />
        </div>

        {/* Asymmetric Split Layout Grid */}
        <div className="my-16 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start mb-32">
          
          {/* Left Column: Premium Grayscale Image Frame */}
          <div className="lg:col-span-2 bg-neutral-50 border border-neutral-100 p-2 group">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110"
                src={assets.contact_img}
                alt="Studio Headquarter"
              />
            </div>
          </div>

          {/* Right Column: High-Density Meta Information Blocks */}
          <div className="lg:col-span-3 flex flex-col gap-10 justify-center h-full text-xs font-medium tracking-wide leading-relaxed text-neutral-500 pt-4">
            
            {/* Headquarters Metadata block */}
            <div className="space-y-4">
              <span className="text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase block">
                01 // PHYSICAL NODE
              </span>
              <h3 className="text-sm font-black tracking-widest uppercase text-black">
                OUR HQ OFFICE
              </h3>
              <p className="normal-case">
                332342 Willms Station <br /> 
                Suite 350 Washington, USA
              </p>
              <p className="font-semibold text-neutral-400">
                TEL: <span className="text-black font-medium font-mono">(234) 423-23</span> <br /> 
                EMAIL: <a href="mailto:admin@essential.ai" className="text-black hover:underline underline-offset-4 decoration-neutral-200">admin@essential.ai</a>
              </p>
            </div>

            {/* Careers Metadata block */}
            <div className="space-y-4 pt-8 border-t border-neutral-100">
              <span className="text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase block">
                02 // HUMAN CAPITAL
              </span>
              <h3 className="text-sm font-black tracking-widest uppercase text-black">
                CAREERS AT STUDIO
              </h3>
              <p>
                We are permanently seeking out ambitious engineering, design, and machine learning talent to expand our core automation systems.
              </p>
              
              {/* Refined Action Control Trigger */}
              <div className="pt-2">
                <button className="group flex items-center gap-4 border-2 border-black bg-black text-white px-8 py-3 text-[10px] font-black tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black">
                  <span>EXPLORE OPEN POSITIONS</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">❯</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Embedded Newsletter Component */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;