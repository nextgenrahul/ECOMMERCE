import React, { useState } from 'react';
import { Range } from 'react-range';

const PriceRange = () => {
  const STEP = 1;
  const MIN = 0;
  const MAX = 1000;
  const [values, setValues] = useState([100, 700]);

  return (
    <div className="w-full max-w-sm bg-white p-6 border border-neutral-100 rounded-sm">
      {/* Editorial Parameter Label */}
      <div className="mb-6">
        <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase block mb-1">
          Index Filter
        </span>
        <h4 className="text-xs font-black tracking-widest uppercase text-black">
          PRICE RANGE<span className="text-neutral-300"> //</span>
        </h4>
      </div>

      {/* React Range Controller Container */}
      <div className="px-2 py-4">
        <Range
          step={STEP}
          min={MIN}
          max={MAX}
          values={values}
          onChange={(newValues) => setValues(newValues)}
          renderTrack={({ props, children }) => {
            // Destructure style out to avoid strict inline overriding bugs
            const { style, ...trackProps } = props;
            
            // Calculate filling percentages for a clean dual-point range mask
            const minPercent = ((values[0] - MIN) / (MAX - MIN)) * 100;
            const maxPercent = ((values[1] - MIN) / (MAX - MIN)) * 100;

            return (
              <div
                {...trackProps}
                className="w-full h-[2px] cursor-pointer"
                style={{
                  ...style,
                  background: `linear-gradient(to right, #e5e5e5 ${minPercent}%, #000000 ${minPercent}%, #000000 ${maxPercent}%, #e5e5e5 ${maxPercent}%)`,
                }}
              >
                {children}
              </div>
            );
          }}
          renderThumb={({ props, isDragged }) => {
            const { style, ...thumbProps } = props;
            return (
              <div
                {...thumbProps}
                className={`h-4 w-4 bg-white border-2 border-black outline-none transition-transform duration-100 cursor-grab active:cursor-grabbing ${
                  isDragged ? 'scale-110 shadow-md bg-black' : ''
                }`}
                style={{
                  ...style,
                  boxShadow: 'none',
                }}
              />
            );
          }}
        />
      </div>

      {/* Value Ledger Layout */}
      <div className="mt-4 flex justify-between items-center text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
        <div className="flex flex-col">
          <span className="text-[9px] text-neutral-300 mb-0.5 font-medium">Minimum</span>
          <span className="text-black">₹{values[0].toLocaleString()}</span>
        </div>
        <div className="h-4 w-[1px] bg-neutral-200" />
        <div className="flex flex-col items-end">
          <span className="text-[9px] text-neutral-300 mb-0.5 font-medium">Maximum</span>
          <span className="text-black">₹{values[1].toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;