import React, { useState } from "react";

const ReasonModal = ({ show, onClose, onSubmit }) => {
  const [reason, setReason] = useState("");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) return;
    
    onSubmit({ reason });
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Premium Minimal Backdrop Overlay */}
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-black/20 backdrop-blur-xs transition-opacity" 
      />

      {/* Structural Modal Content Canvas */}
      <div className="bg-white w-full max-w-md border-2 border-black p-6 md:p-8 shadow-2xl z-10 relative rounded-sm">
        
        {/* Editorial Section Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase block mb-1">
              INPUT REQUIRED
            </span>
            <h3 className="text-md font-black tracking-widest uppercase text-black">
              PROVIDE REASON<span className="text-neutral-300"> //</span>
            </h3>
          </div>
          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-black transition-colors text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form Action Processing */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            className="w-full border border-neutral-200 text-xs font-semibold tracking-wider p-4 h-32 resize-none bg-neutral-50 focus:bg-white focus:border-black outline-none transition-all placeholder-neutral-400 uppercase"
            placeholder="TYPE STATEMENT SPECIFICS HERE..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          {/* Precision Layout Control Grid */}
          <div className="flex items-center justify-end gap-3 text-[10px] font-black tracking-widest uppercase">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-neutral-200 text-neutral-400 hover:text-black hover:border-black transition-all"
            >
              CANCEL
            </button>
            
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white border border-black transition-all hover:bg-white hover:text-black"
            >
              SUBMIT DATA
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ReasonModal;