import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/images/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto pt-10">
        
        {/* Section Title */}
        <div className="border-t border-neutral-100 pt-8">
          <Title text1="MANIFESTO" text2="STUDIO" />
        </div>

        {/* Studio Origins Image Section */}
        <div className="my-16 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          {/* Asymmetric Left Hero Image Frame */}
          <div className="lg:col-span-2 bg-neutral-50 border border-neutral-100 p-2 group">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110"
                src={assets.about_img}
                alt="Studio Presentation"
              />
            </div>
          </div>
          
          {/* Editorial Narrative Column */}
          <div className="lg:col-span-3 flex flex-col justify-center gap-8 text-xs font-medium tracking-wide leading-relaxed text-neutral-500">
            <div className="space-y-4">
              <span className="text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase block">
                01 // ORIGINS
              </span>
              <p className="text-black font-semibold text-sm leading-relaxed normal-case">
                ESSENTIAL was engineered out of a definitive architectural perspective: to strip digital commerce down to its most pure, uncompromised state. 
              </p>
              <p>
                We operate outside the traditional fast-fashion cycle. Our framework focuses entirely on clean minimalist construction, meticulous manufacturing loops, and premium materials designed to permanently endure.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-100">
              <span className="text-[9px] font-black tracking-[0.3em] text-black uppercase block">
                02 // THE NEURAL LAYER
              </span>
              <p>
                By integrating specialized machine learning protocols directly into our search filters, we allow you to bypass basic keyword configurations entirely. Describe an overall mood, structural fit, or aesthetic vibe, and let our semantic matrix curate your daily lineup instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Structural Capabilities Layout */}
        <div className="mt-28 mb-12">
          <Title text1="CORE" text2="CAPABILITIES" />
        </div>
        
        {/* Triple Column Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-black text-xs mb-32 divide-y md:divide-y-0 md:divide-x divide-black">
          
          {/* Value 01 */}
          <div className="px-8 py-12 md:py-16 flex flex-col gap-4 bg-white hover:bg-neutral-50 transition-colors group">
            <div className="flex items-center justify-between">
              <span className="font-black tracking-widest uppercase text-black">QUALITY PROOF</span>
              <span className="text-[9px] font-black text-neutral-300 tracking-widest group-hover:text-black transition-colors">[MTRX-A]</span>
            </div>
            <p className="tracking-wide leading-relaxed text-neutral-500 font-medium">
              Every garment profile is subjected to intense structural evaluation metrics. We source exclusively from premium micro-mills to guarantee immaculate fabric density and weave integrity.
            </p>
          </div>

          {/* Value 02 */}
          <div className="px-8 py-12 md:py-16 flex flex-col gap-4 bg-white hover:bg-neutral-50 transition-colors group">
            <div className="flex items-center justify-between">
              <span className="font-black tracking-widest uppercase text-black">FLUID LOGISTICS</span>
              <span className="text-[9px] font-black text-neutral-300 tracking-widest group-hover:text-black transition-colors">[MTRX-B]</span>
            </div>
            <p className="tracking-wide leading-relaxed text-neutral-500 font-medium">
              From automated cart calculation checkouts to dynamic route fleet sorting systems, our fulfillment engine is optimized for absolute friction-free delivery processing.
            </p>
          </div>

          {/* Value 03 */}
          <div className="px-8 py-12 md:py-16 flex flex-col gap-4 bg-white hover:bg-neutral-50 transition-colors group">
            <div className="flex items-center justify-between">
              <span className="font-black tracking-widest uppercase text-black">AI CONCIERGE</span>
              <span className="text-[9px] font-black text-neutral-300 tracking-widest group-hover:text-black transition-colors">[MTRX-C]</span>
            </div>
            <p className="tracking-wide leading-relaxed text-neutral-500 font-medium">
              Eliminate standard customer support response delays. Our embedded catalog intelligence matrix handles real-time data tracking queries and order adjustments instantly.
            </p>
          </div>
          
        </div>
      </div>

      {/* Embedded Newsletter Footer Component */}
      <NewsLetterBox />
    </div>
  );
};

export default About;