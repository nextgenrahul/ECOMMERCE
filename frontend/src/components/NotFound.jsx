import React from 'react';
const NotFound = ({ text1 = "404 - Page Not Found", text2 = "Sorry, the page you're looking for doesn't exist." }) => {
  return (
    <div className="mt-10 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-2xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-4">{text1}</h1>
      <p className="sm:text-[12px] md:text-lg text- text-gray-600 mb-6">{text2}</p>
      <a href="/" className="text-blue-600 underline hover:text-blue-800">Go back to Home</a>
    </div>
  );
};

export default NotFound;
