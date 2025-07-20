import React, { useContext, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/images/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const inputsRef = useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmit, setIsOtpSubmit] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
    if (pasted.length === 6 && !isNaN(pasted)) {
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
      const { data } = await axios.post(
        `${backendUrl}/api/user/send-reset-otp`,
        { email }
      );
      setTimeout(() => setDisabled(false), 5000);
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
        setTimeout(() => setDisabled(false), 5000);
      } else {
        setTimeout(() => setDisabled(false), 5000);
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputsRef.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmit(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/reset-password",
        { email, otp, newPassword }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && navigate("/login");
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <div className="mt-10 flex items-center justify-center bg-white">
        {!isEmailSent && (
          <form
            onSubmit={onSubmitEmail}
            className="w-full max-w-sm rounded-lg p-6 "
          >
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Reset Password
            </h1>
            <p className="text-sm text-center mb-4">
              Enter your registered email address
            </p>
            <div className="w-full flex justify-center items-center">
              <img
                src={assets.main_icon}
                alt="mail icon"
                className="w-10 h-10 mr-2"
              />
            </div>
            <div className="flex items-center rounded px-3 py-2 mb-4">
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-2 border-gray-400 rounded focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={disabled}
              className="w-full bg-[#FF583E] text-white py-2 rounded bg-[#FF583E]hover:bg-[#ff3e3e] transition-all"
            >
              {disabled ? "Please wait..." : "Send Reset Link"}
            </button>
          </form>
        )}
        {/*  Otp Input Form */}

        {!isOtpSubmit && isEmailSent && (
          <form
            autocomplete="off"
            onSubmit={onSubmitOtp}
            className="w-full max-w-sm rounded-lg p-6"
          >
            <h1 className="text-2xl font-semibold mb-2 text-center">
              Reset Password Otp
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
                    className="w-12 h-12 border-2 border-gray-400 text-black text-center text-xl rounded focus:outline-none appearance-none "
                  />
                ))}
            </div>

            <button
              type="submit"
              className="w-full text-white py-2 rounded bg-[#FF583E] hover:bg-[#ff3e3e] transition-all"
            >
              Submit
            </button>
          </form>
        )}

        {/* Enter New Password */}
        {isOtpSubmit && isEmailSent && (
          <form
            onSubmit={onSubmitNewPassword}
            className="w-full max-w-sm rounded-lg p-6"
          >
            <h1 className="text-2xl font-semibold mb-2 text-center">
              New Password
            </h1>
            <p className="text-sm text-center mb-4">
              Enter the new Password Below
            </p>

            <div className="flex items-center border-2 border-gray-400 rounded px-3 py-2 mb-4">
              <img
                src={assets.lock_icon}
                alt="mail icon"
                className="w-5 h-5 mr-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full outline-none text-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF583E] hover:bg-[#ff3e3e] text-white py-2 rounded transition-all"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
