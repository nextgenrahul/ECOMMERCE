import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";

const MainHome = () => {
  return (
    <main className="w-full bg-white text-black overflow-x-hidden space-y-4 md:space-y-8 animate-fade-in">
      
      <Hero />
      
      <LatestCollection />
      
      <BestSeller />
      
      <OurPolicy />
      
      <NewsLetterBox />
      
    </main>
  );
};

export default MainHome;