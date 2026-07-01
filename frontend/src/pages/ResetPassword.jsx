import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/images/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  
  const inputsRef = useRef([]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      inputsRef.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pasted)) {
      [...pasted].forEach((char, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i].value = char;
        }
      });
      inputsRef.current[5]?.focus();
    }
  };
  
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setDisabled(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/user/send-reset-otp`, { email });
      if (data.success) {
        toast.success(data.message || "OTP transmitted successfully");
        setIsEmailSent(true);
      } else {
        toast.error(data.message || "Failed to transmit token");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Authentication gateway exception");
    } finally {
      // Centralized cooldown window to guarantee button unlock safely
      setTimeout(() => setDisabled(false), 5000);
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpString = inputsRef.current.map((el) => el?.value || "").join("");
    if (otpString.length !== 6) {
      toast.error("Security code must be exactly 6 digits");
      return;
    }
    
    // CRITICAL FIX: Retain string in local component memory block state
    setOtp(otpString); 
    setIsOtpSubmit(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, { 
        email, 
        otp, // Safe, un-batched string data sent to api
        newPassword 
      });
      if (data.success) {
        toast.success(data.message || "Security configuration updated");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to update security credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Terminal reconfiguration error");
    }
  };
  
  return (
    <section className="min-h-[85vh] flex items-center justify-between px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black relative overflow-hidden">
      
      {/* Left Column: Multi-Stage Workflow Canvas */}
      <div className="w-full max-w-sm flex flex-col items-start text-left space-y-8 z-10 py-12">
        
        {/* Brand System Anchor */}
        <div onClick={() => navigate("/")} className="cursor-pointer tracking-[0.2em] group">
          <span className="font-black text-sm uppercase transition-opacity group-hover:opacity-60">
            ESSENTIAL // RECOVERY
          </span>
        </div>

        {/* STAGE 01: Capture Node Email */}
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="w-full space-y-6 animate-fade-in">
            <div className="space-y-2">
              <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block">STAGE_01 // IDENTITY</span>
              <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">RESET PASSWORD</h1>
              <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium">Enter your registered email address to request a single-use matrix recovery token.</p>
            </div>

            <div className="flex items-center border-2 border-black bg-neutral-50 focus-within:bg-white transition-all px-4 py-3">
              <img src={assets.main_icon} alt="mail" className="w-4 h-4 mr-3 opacity-60 filter brightness-0" />
              <input
                type="email"
                placeholder="ENTER REGISTERED EMAIL NODE..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-xs font-semibold tracking-wider placeholder-neutral-400 uppercase"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={disabled}
              className={`w-full text-[10px] font-black tracking-widest py-4 border border-black transition-all uppercase ${
                disabled ? "bg-neutral-200 border-neutral-200 text-neutral-400 cursor-not-allowed" : "bg-black text-white hover:bg-white hover:text-black"
              }`}
            >
              {disabled ? "TRANSMITTING..." : "TRANSMIT OTP TOKEN"}
            </button>
          </form>
        )}

        {/* STAGE 02: Verification Code Matching */}
        {!isOtpSubmit && isEmailSent && (
          <form onSubmit={onSubmitOtp} className="w-full space-y-6 animate-fade-in" autoComplete="off">
            <div className="space-y-2">
              <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block">STAGE_02 // AUTHENTICATE</span>
              <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">ENTER SECURITY CODE</h1>
              <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium">Type the 6-digit access code dispatched to your profile coordinates.</p>
            </div>

            <div className="flex gap-2.5 justify-between">
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    required
                    ref={(el) => (inputsRef.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={handlePaste}
                    className="w-full aspect-square border-2 border-neutral-200 text-black text-center text-lg font-black bg-neutral-50 focus:bg-white focus:border-black focus:outline-none transition-all rounded-none uppercase"
                  />
                ))}
            </div>

            <button type="submit" className="w-full bg-black text-white text-[10px] font-black tracking-widest py-4 border border-black transition-all hover:bg-white hover:text-black uppercase">
              VERIFY MATRIX CODE
            </button>
          </form>
        )}

        {/* STAGE 03: Establish New Credentials */}
        {isOtpSubmit && isEmailSent && (
          <form onSubmit={onSubmitNewPassword} className="w-full space-y-6 animate-fade-in">
            <div className="space-y-2">
              <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block">STAGE_03 // RECONFIGURATION</span>
              <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">NEW CREDENTIALS</h1>
              <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium">Define a secure pass phrase configuration to re-verify your catalog session lock.</p>
            </div>

            <div className="flex items-center border-2 border-black bg-neutral-50 focus-within:bg-white transition-all px-4 py-3">
              <img src={assets.lock_icon} alt="lock" className="w-4 h-4 mr-3 opacity-60 filter brightness-0" />
              <input
                type="password"
                placeholder="ENTER SECURE PASSWORD..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-xs font-semibold tracking-wider placeholder-neutral-400 uppercase"
                required
              />
            </div>

            <button type="submit" className="w-full bg-black text-white text-[10px] font-black tracking-widest py-4 border border-black transition-all hover:bg-white hover:text-black uppercase">
              FINALIZE MODIFICATION
            </button>
          </form>
        )}

        {/* Technical Ticker Footer */}
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-neutral-400 uppercase pt-2">
          <span className="h-1 w-1 bg-neutral-300 rounded-full animate-pulse" />
          <span>Secured Session Matrix Verification</span>
        </div>
      </div>

      {/* Right Column: Abstract Blueprint Panel Spacer */}
      <div className="hidden lg:flex flex-col items-end justify-center w-1/3 h-full select-none pointer-events-none opacity-[0.02]">
        <span className="text-[20vw] font-black tracking-tighter text-black select-none leading-none">
          KEY
        </span>
      </div>

    </section>
  );
};

export default ResetPassword;