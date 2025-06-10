import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { assets } from "../assets/images/assets";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleResetPassword = () => {
    alert("Reset Password functionality to be implemented");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert("Login functionality to be implemented");
    } else {
      alert("Sign Up functionality to be implemented");
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
        <Link to="/">
          <img src={assets.logoIcon} alt="" />
        </Link>
      </div>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 border-2 border-black rounded-lg bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="fullname">
                  FullName
                </label>
                <input
                  type="text"
                  id="fullname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border-2 border-black rounded focus:outline-none"
                  placeholder="Enter your fullname"
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border-2 border-black rounded focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border-2 border-black rounded focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white p-2 rounded hover:bg-[#3d3d3d]"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className="mt-4 text-center">
            {isLogin ? (
              <>
                <p>
                  <Link className="text-blue-600 cursor-pointer" to="/reset-password">
                    Forgot Password?
                  </Link>
                </p>
                <p className="mt-2">
                  Don't have an account?{" "}
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={toggleForm}
                  >
                    Sign Up
                  </span>
                </p>
              </>
            ) : (
              <p className="mt-4 text-center">
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={toggleForm}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
