import React from 'react';
import { assets } from '../assets/images/assets';

const Header = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-black text-center px-4">
      
      <h1 className="text-3xl font-semibold flex items-center gap-2 mb-2">
        Hey Developer
        <img src={assets.hand_wave} alt="wave" className="w-8 aspect-square" />
      </h1>
      <h2 className="text-xl font-medium mb-4">Welcome to our app</h2>
      <p className="max-w-md mb-6">
        Let's start with a quick product tour and we’ll have you up and running in no time!
      </p>
      <button className="flex items-center gap-2 border border-black-500 rounded-full px-10 py-4 text-gray-800 hover:bg-gray-100 transition-all">
        Get Started
      </button>
    </div>
  );
};

export default Header;
