// import React from "react";
// import { assets } from "../assets/images/assets.js";
// const Hero = () => {
//   return (
//     <div className="flex flex-col sm:flex-row">

//       <div className="relative w-full h-[190px]">
//         <img
//           className="w-full h-full object-cover"
//           src={assets.front2}
//           alt="Hero"
//         />
//         {/* Bottom Fade Blur Overlay */}
//         <div className="absolute bottom-0 left-0 w-full h-24 
//                   bg-gradient-to-t from-white/90 via-white/60 to-transparent 
//                   backdrop-blur-sm">
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Hero;


{/* Hero Left Side */ }
{/* <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BEST SELLER</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div> */}
{/* Hero Right Side */ }
{/* <img className="w-full sm:w-1/3" src={assets.hero_i} alt="" /> */ }


import React from "react";
import { assets } from "../assets/images/assets.js";

const Hero = () => {
  return (
    <div className="relative w-full h-[800px] sm:h-[850px] overflow-hidden z-50">
      <img
        className="w-full h-full object-cover"
        src={assets.front2}
        alt="Hero"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      <div className="absolute bottom-0 left-0 w-full h-28 
                      bg-gradient-to-t from-white via-white/80 to-transparent">
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 sm:px-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Discover Your Style
        </h1>
        <p className="mt-3 text-base sm:text-lg text-gray-200 max-w-2xl">
          Shop the latest trends in fashion with comfort, quality, and elegance.
          Your perfect look starts here.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="px-6 py-3 bg-[#C19A6B] text-white font-medium rounded-2xl shadow-lg hover:bg-[#a87f52] transition-all duration-300">
            Shop Now
          </button>
          <button className="px-6 py-3 bg-white text-gray-900 font-medium rounded-2xl shadow-lg hover:bg-gray-100 transition-all duration-300">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
};
  
export default Hero;
