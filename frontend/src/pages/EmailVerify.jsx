import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const { backendUrl, userData, isLoggedin, getUserData } = useContext(AppContext);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputsRef.current.map((el) => el?.value || "").join("");
    const verifyToken = localStorage.getItem("token");
    
    if (otp.length !== 6) {
      toast.error("Security code must be exactly 6 digits");
      return;
    }
    if (!verifyToken) {
      toast.error("Authorization token signature missing");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/user/verify-login-otp`,
        { otp, verifyToken }
      );
      if (data.success) {
        toast.success(data.message || "Security authorization cleared");
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message || "Verification rejected");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification gateway exception");
    }
  };

  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <section className="min-h-[85vh] flex items-center justify-between px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black relative overflow-hidden">
      
      {/* Left Column: Security Interface Panel */}
      <div className="w-full max-w-sm flex flex-col items-start text-left space-y-8 z-10 py-12">
        
        {/* Brand System Anchor */}
        <div onClick={() => navigate("/")} className="cursor-pointer tracking-[0.2em] group">
          <span className="font-black text-sm uppercase transition-opacity group-hover:opacity-60">
            ESSENTIAL // SECURITY
          </span>
        </div>

        {/* Dynamic Heavyweight Headlines */}
        <div className="space-y-2 w-full">
          <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block">
            IDENTITY REQUIREMENT
          </span>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
            VERIFY ACCOUNT<span className="text-neutral-300"> //</span>
          </h1>
          <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium">
            Enter the 6-digit dynamic OTP configuration sent to your registered email node to clear secure access parameters.
          </p>
        </div>

        {/* Verification Processing Engine Form */}
        <form onSubmit={onSubmitHandler} className="w-full space-y-6">
          
          {/* Stark Code Entry Block Grid */}
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

          {/* Solid Control Execution Trigger */}
          <button
            type="submit"
            className="w-full bg-black text-white text-[10px] font-black tracking-widest py-4 border border-black transition-all hover:bg-white hover:text-black uppercase"
          >
            AUTHORIZE NODE
          </button>
        </form>

        {/* Structural Telemetry Accent */}
        <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest text-neutral-400 uppercase pt-2">
          <span className="h-1 w-1 bg-neutral-300 rounded-full animate-pulse" />
          <span>Encrypted Gateway Protocol</span>
        </div>
      </div>

      {/* Right Column: Abstract Architectural Context Blueprint */}
      <div className="hidden lg:flex flex-col items-end justify-center w-1/3 h-full select-none pointer-events-none opacity-[0.02]">
        <span className="text-[20vw] font-black tracking-tighter text-black select-none leading-none">
          SEC
        </span>
      </div>

    </section>
  );
};

export default EmailVerify;