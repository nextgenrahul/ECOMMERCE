import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useContext } from "react";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children, token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [categoryAllData, setCategoryAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategoryDataAll = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/category/list`, {
        headers: {
          token,
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setCategoryAllData(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    if (token) {
      getCategoryDataAll();
    }
  }, [token]);

  const value = {
    backendUrl,
    categoryAllData,
    setLoading,
  };

  return (
    <>
      {loading && <Loader />}
      <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    </>
  );
};
