import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Siderbar from "./components/Siderbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./pages/Category";
import { AdminContextProvider } from "./context/AdminContext";
import SubCategory from "./pages/SubCategory";
import OrderReturn from "./pages/OrderReturn";
import AddColor from "./pages/AddColor";
import { jwtDecode } from "jwt-decode";
import Loader from "./components/Loader";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  // ✅ Check if token is valid on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(savedToken);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  // ✅ Save token in localStorage whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  // ✅ Loader for page transition
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      <AdminContextProvider token={token}>
        {token === "" ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className="flex w-full">
              <Siderbar />
              <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
                <Routes>
                  <Route path="/" element={<Add token={token} />} />
                  <Route path="/add" element={<Add token={token} />} />
                  <Route path="/list" element={<List token={token} />} />
                  <Route path="/orders" element={<Orders token={token} />} />
                  <Route
                    path="/addCategories"
                    element={<Category token={token} />}
                  />
                  <Route
                    path="/addSubCategories"
                    element={<SubCategory token={token} />}
                  />
                  <Route path="/order-return" element={<OrderReturn />} />
                  <Route path="/addColor" element={<AddColor token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </AdminContextProvider>
    </div>
  );
};

export default App;
