import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/images/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-black border-t border-neutral-100 px-6 md:px-12 max-w-[1600px] mx-auto mt-40 pt-16 pb-8">
      {/* Structural Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Manifest Block */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 tracking-[0.2em]">
            <img src={assets.logo_icon} className="w-6 opacity-90" alt="Logo" />
            <span className="font-black text-sm uppercase">ESSENTIAL</span>
          </div>
          <p className="text-xs tracking-wide leading-relaxed text-neutral-400 max-w-sm font-medium">
            Architecting modern functional staples. Our garments are intentionally designed to exist outside of the standard cyclical trend matrix.
          </p>
        </div>

        {/* Navigation Core Ledger */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black tracking-[0.25em] text-black uppercase">
            STRUCTURE
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
            <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
            <li><Link to="/collection" className="hover:text-black transition-colors">Catalog</Link></li>
            <li><Link to="/about" className="hover:text-black transition-colors">Journal</Link></li>
            <li><Link to="/trackOrder" className="hover:text-black transition-colors">Logistics</Link></li>
          </ul>
        </div>

        {/* Communications Channel */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-black tracking-[0.25em] text-black uppercase">
            CHANNELS
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold tracking-wide text-neutral-500 lowercase">
            <li className="tracking-widest text-neutral-400 font-medium">+1 222 343 2235</li>
            <li>
              <a href="mailto:contact@essential.ai" className="hover:text-black transition-colors underline underline-offset-4 decoration-neutral-200 hover:decoration-black">
                contact@essential.ai
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Baseline System Matrix */}
      <div className="border-t border-neutral-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
        <p>
          © {currentYear} ESSENTIAL STUDIO. ALL RIGHTS RESERVED.
        </p>
        
        {/* AI System Status Marker to solidify our design theme */}
        <div className="flex items-center gap-2 font-black text-black">
          <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
          <span>AI CORE SYNCHRONIZED</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;