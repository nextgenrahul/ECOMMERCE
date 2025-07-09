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
import AddColor from "./pages/AddColor";
import { useLocation } from "react-router-dom";

// 👉 Import your loader
import Loader from "./components/Loader";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

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
                  <Route
                    path="/addColor"
                    element={<AddColor token={token} />}
                  />
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
