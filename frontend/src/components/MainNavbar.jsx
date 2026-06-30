import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/images/assets.js";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MainNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aiSearchMode, setAiSearchMode] = useState(false); 
  const [searchQuery, setSearchQuery] = useState("");

  const {
    getCartCount,
    navigate,
    setCartItems,
    isLoggedin,
    backendUrl,
    setIsLoggedin,
    userName,
  } = useContext(AppContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/collection?search=${encodeURIComponent(searchQuery)}&aiMode=${aiSearchMode}`);
  };

  const logout = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        setIsLoggedin(false);
        setCartItems({});
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <header className="w-full bg-white/80 backdrop-blur-md text-black sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center justify-between px-6 py-4 md:px-12 max-w-[1600px] mx-auto">
        
        {/* LEFT: Branding + Inline Minimal Navigation */}
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 group tracking-[0.2em]">
            <span className="font-black text-lg uppercase transition-opacity group-hover:opacity-60">
              ESSENTIAL
            </span>
          </Link>

          {/* Desktop Navigation embedded directly beside brand */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-semibold tracking-[0.15em] text-neutral-400 uppercase">
            {[
              { path: "/", label: "Home" },
              { path: "/collection", label: "Catalog" },
              { path: "/about", label: "Journal" },
              { path: "/contact", label: "Contact" },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `transition-all hover:text-black hover:tracking-[0.2em] ${
                    isActive ? "text-black font-bold border-b border-black pb-1" : ""
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* CENTER: Floating Borderless Search Canvas */}
        <form 
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md mx-8 h-9 items-center relative group"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={aiSearchMode ? "✨ Describe a mood or fit..." : "Search catalog..."}
            className="w-full h-full bg-neutral-50 px-4 rounded-full text-xs outline-none transition-all focus:bg-neutral-100 placeholder-neutral-400 font-medium text-center"
          />
          
          {/* Subtle Dynamic AI Trigger Inside Input Box */}
          <button
            type="button"
            onClick={() => setAiSearchMode(!aiSearchMode)}
            className={`absolute left-2 text-[9px] font-black tracking-widest px-2 py-1 rounded-full transition-all uppercase ${
              aiSearchMode 
                ? "bg-black text-white" 
                : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
            }`}
          >
            {aiSearchMode ? "AI" : "Key"}
          </button>

          <button type="submit" className="absolute right-3 text-neutral-400 hover:text-black transition-colors">
            <img src={assets.search_icon} className="w-3 opacity-60" alt="Search" />
          </button>
        </form>

        {/* RIGHT: Minimal Control System Icons */}
        <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest">
          
          {/* User Status / Account Dropdown */}
          <div className="group relative py-1 cursor-pointer">
            <div className="flex items-center gap-1 hover:opacity-50 transition-opacity">
              <span className="font-medium text-neutral-400 hidden sm:inline lowercase">
                {isLoggedin && userName?.email ? userName.email.split('@')[0] : "account"}
              </span>
              <img src={assets.profile_icon} className="w-4 opacity-80" alt="Profile" />
            </div>

            {/* Premium Dropdown Layer */}
            <div className="hidden group-hover:block absolute right-0 top-full pt-3 w-44 z-50">
              <div className="bg-white text-black p-2 shadow-xl border border-neutral-100 flex flex-col rounded-sm">
                {isLoggedin ? (
                  <>
                    <Link to="/profile" className="hover:bg-neutral-50 px-3 py-2 transition-colors">Profile</Link>
                    <Link to="/orders" className="hover:bg-neutral-50 px-3 py-2 transition-colors">Orders</Link>
                    <hr className="border-neutral-100 my-1" />
                    <button onClick={logout} className="w-full text-left px-3 py-2 font-black text-neutral-400 hover:text-black transition-colors">
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="w-full bg-black text-white py-2 text-center font-bold block transition-colors">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Elegant Cart Link */}
          <Link to="/cart" className="flex items-center gap-1.5 hover:opacity-50 transition-opacity relative group">
            <img src={assets.cart_icon} className="w-4 h-4 object-contain opacity-80" alt="Cart" />
            <span className="text-neutral-400 group-hover:text-black transition-colors font-medium">({getCartCount()})</span>
          </Link>

          {/* Menu Drawer Toggle for Mobile / Tablets */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-black p-1"
          >
            <img src={assets.menu_icon} className="w-4" alt="Menu" />
          </button>
        </div>
      </div>

      {/* Slide-out Overlay System */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          <div onClick={() => setMobileMenuOpen(false)} className="flex-1 bg-black/10 backdrop-blur-xs" />

          <div className="w-72 h-full bg-white text-black flex flex-col shadow-2xl p-8 justify-between">
            <div>
              <div className="flex items-center justify-between pb-8 mb-8 border-b border-neutral-100">
                <span className="font-black text-xs uppercase tracking-widest">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-neutral-400 hover:text-black text-xs">✕ Close</button>
              </div>

              <div className="flex flex-col gap-6 font-semibold uppercase tracking-widest text-xs">
                {[
                  { path: "/", label: "Home" },
                  { path: "/collection", label: "Catalog" },
                  { path: "/about", label: "Journal" },
                  { path: "/contact", label: "Contact" },
                  { path: "/trackOrder", label: "Track Order" },
                ].map(({ path, label }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-neutral-400 block transition-colors"
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>

            {isLoggedin && (
              <button 
                onClick={() => { setMobileMenuOpen(false); logout(); }} 
                className="w-full border border-neutral-200 text-neutral-400 hover:text-black font-bold py-2.5 text-center transition-colors text-[10px] uppercase tracking-widest"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNavbar;