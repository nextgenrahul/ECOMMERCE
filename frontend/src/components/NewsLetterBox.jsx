import React, { useState } from 'react';
import { toast } from 'react-toastify';

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    
    // Core ledger action hook
    toast.success("COMMUNICATION ENCRYPTED // SUBSCRIBED");
    setEmail("");
  };

  return (
    <section className="py-20 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-neutral-100 bg-white text-black">
      {/* Asymmetric Split Layout Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Left Column: Typographic Hook */}
        <div className="lg:col-span-2 space-y-3">
          <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase block">
            Studio Matrix
          </span>
          <h3 className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none">
            JOIN THE JOURNAL<span className="text-neutral-200"> //</span>
          </h3>
          <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium max-w-sm">
            Receive automated notifications regarding zero-hour production drops, archival restocks, and AI curation insights. 20% tier concession applied on access.
          </p>
        </div>

        {/* Right Column: High-Contrast Form Processing */}
        <div className="lg:col-span-3 w-full">
          <form 
            onSubmit={onSubmitHandler} 
            className="w-full flex flex-col sm:flex-row items-stretch border-2 border-black bg-white"
          >
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full flex-1 px-4 py-3.5 text-xs font-semibold tracking-wider text-black outline-none bg-transparent placeholder-neutral-400" 
              type="email" 
              placeholder="ENTER CURRENT EMAIL NODE..." 
              required 
            />
            
            <button 
              type="submit" 
              className="bg-black text-white text-[10px] font-black tracking-widest px-8 py-4 uppercase border-t-2 border-black sm:border-t-0 sm:border-l-2 transition-all duration-300 hover:bg-white hover:text-black"
            >
              SUBSCRIBE
            </button>
          </form>

          {/* Infrastructure Compliance Detail */}
          <div className="mt-3 flex items-center gap-2 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
            <span className="h-1 w-1 bg-neutral-300 rounded-full" />
            <span>SECURE SSL ACCESS LINK • NO EXTERNAL ADVERTISING TELEMETRY</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsLetterBox;