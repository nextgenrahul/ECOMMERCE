import { assets } from "../assets/images/assets.js";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const EmailVerify = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const { backendUrl, userData, isLoggedin, getUserData } =
    useContext(AppContext);

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
    const otp = inputsRef.current.map((el) => el.value).join("");
    const verifyToken = localStorage.getItem("token");
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    if(!verifyToken){
      toast.error("Please enter a valid Token");
      return
    }

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/user/verify-login-otp",
        { otp, verifyToken }
      );
      if (data.success) {
        toast.success(data.message || "Email verified successfully");
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Verification error");
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center px-4">
      <img
        onClick={() => navigate("/")}
        src={assets.logoIcon}
        alt="Logo"
        className="w-20 sm:w-28 mb-6 cursor-pointer"
      />

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-sm border border-black rounded-lg p-6 shadow-md"
      >
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Email Verification
        </h1>
        <p className="text-sm text-center mb-4">
          Enter the 6-digit OTP sent to your registered email address
        </p>

        <div className="flex gap-2 justify-center mb-4">
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
                className="w-12 h-12 border border-black text-black text-center text-xl rounded focus:outline-none"
              />
            ))}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition-all"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
