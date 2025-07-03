import React, { useRef } from "react";

const FloatingInput = () => {
  const inputsRef = useRef([]);

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
    const pasted = e.clipboardData.getData("Text").trim();
    if(pasted.length === 6 && !isNaN(pasted)){
      [...pasted].forEach((char, i) => {
        if(inputsRef.current[i]){
          inputsRef.current[i].value = char;
        }
      });
      inputsRef.current[5]?.focus();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm border border-black rounded-lg p-6 shadow-md">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Reset Password Otp
        </h1>
        <p className="text-sm text-center mb-4">
          Enter the 6-digit OTP sent to your registered email address
        </p>
        <div className="flex gap-2">
          {Array(6)
            .fill(0)
            .map((_, index) => {
              return (
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
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FloatingInput;
