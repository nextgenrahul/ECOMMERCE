import React, { useContext, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { useEffect } from "react";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let response;
    try {
      setLoading(true);
      if (email && password) {
        response = await axios.post(`${backendUrl}/api/user/admin`, {
          email,
          password,
        });
      }
      console.log(response);

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() =>{
    alert("Please Use Email : admin@gmail.com     And Password: 123")
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <p className="mb-1 text-gray-700 text-sm">Email Address</p>
            <input
              className="rounded-full w-full px-4 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-gray-400"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <p className="mb-1 text-gray-700 text-sm">Password</p>
            <input
              className="rounded-full w-full px-4 py-2 border border-gray-300 outline-none focus:ring-2 focus:ring-gray-400"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-full hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
