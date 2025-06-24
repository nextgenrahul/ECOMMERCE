import { useState } from 'react';
import { Range } from 'react-range';

const PriceRange = () => {
  const STEP = 1;
  const MIN = 0;
  const MAX = 1000;
  const [values, setValues] = useState([100, 700]);

  return (
    <div>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              background: 'linear-gradient(to right, #000, #0f0, #ccc)',
            }}
          >
            {children}  
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              backgroundColor: '#fff',
              border: '2px solid #00b894',
              borderRadius: '50%',
              boxShadow: '0 0 5px rgba(0,0,0,0.2)',
            }}
          />
        )}
      />
      <div className="mt-4 flex justify-between">
        <span>Min: ₹{values[0]}</span>
        <span>Max: ₹{values[1]}</span>
      </div>
    </div>
  );
};


export default PriceRange