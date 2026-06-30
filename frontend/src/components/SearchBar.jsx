import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { assets } from "../assets/images/assets.js";
import { AppContext } from "../context/AppContext";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Extract ongoing AI mode parameters from search engine routing URL configurations
  const isAiMode = searchParams.get("aiMode") === "true";

  useEffect(() => {
    // Only mount visibility triggers if the client context is inside the collection domain
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  if (!showSearch || !visible) return null;

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    
    // Live update the global browser search parameters stack
    const currentParams = Object.fromEntries(searchParams.entries());
    if (value.trim()) {
      setSearchParams({ ...currentParams, search: value });
    } else {
      delete currentParams.search;
      setSearchParams(currentParams);
    }
  };

  return (
    <div className="w-full bg-white border-b border-black text-black px-6 md:px-12 transition-all duration-300 animate-fade-in">
      <div className="max-w-[1600px] mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left Aspect: Engine Status Tracker Label */}
        <div className="flex items-center gap-3 self-start sm:self-center">
          <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase">
            {isAiMode ? "⚡ AI SEMANTIC RUN ACTIVE" : "STANDARD MATRIX ARCHIVE"}
          </span>
        </div>

        {/* Center Aspect: Flat Minimalist Core Input Field Box */}
        <div className="w-full sm:max-w-xl flex items-center gap-4 border-2 border-black bg-neutral-50 px-4 py-2.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-black/10">
          <input
            value={search}
            onChange={handleQueryChange}
            className="w-full flex-1 outline-none bg-transparent text-xs font-semibold tracking-wider text-black placeholder-neutral-400 uppercase"
            type="text"
            placeholder={isAiMode ? "DESCRIBE THE MOOD OR FIT PARAMETERS..." : "TYPE KEYWORD SEARCH OVERVIEW..."}
          />
          <img className="w-3.5 opacity-60 filter brightness-0" src={assets.search_icon} alt="Search" />
        </div>

        {/* Right Aspect: Close Panel Control Link */}
        <button
          onClick={() => setShowSearch(false)}
          className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase hover:opacity-50 transition-opacity self-end sm:self-center"
        >
          <span>CLOSE CONSOLE</span>
          <img
            className="w-3 filter brightness-0"
            src={assets.cross_icon}
            alt="Close"
          />
        </button>

      </div>
    </div>
  );
};

export default SearchBar;