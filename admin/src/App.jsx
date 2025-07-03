import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Siderbar from "./components/Siderbar";
import { Route, Routes } from "react-router-dom";
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

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";
const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
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
                  <Route path="/checker" element={<VerifyOtp />} />

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
