import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children, token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [categoryAllData, setCategoryAllData] = useState([])
  const getCategoryDataAll = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/category/list`, {
        headers: { token },
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
    getCategoryDataAll();
  },[])

  const value = {
    backendUrl,
    categoryAllData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
