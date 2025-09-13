import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setLoading, getUserData } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true)
      axios.defaults.withCredentials = true;
      if (!isLogin) {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
          getUserData();
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false)
    }
  };

  return (
    <>
      <div className="mt-10 flex items-center justify-center bg-white px-10">
        <div className="w-full max-w-md p-8 rounded-lg bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border-2 border-gray-400 rounded focus:outline-none"
                  placeholder="Enter your Name"
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
                className="w-full p-2 border-2 border-gray-400 rounded focus:outline-none"
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
                className="w-full p-2 border-2 border-gray-400 rounded focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF583E] hover:bg-[#ff3e3e] text-white p-2 rounded"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <div className="mt-4 text-center">
            {isLogin ? (
              <>
                <p>
                  <Link
                    className="text-blue-600 cursor-pointer"
                    to="/reset-password"
                  >
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
