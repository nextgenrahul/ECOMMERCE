import axios from "axios";
import { useEffect, useState, createContext, useCallback } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children, token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [categoryAllData, setCategoryAllData] = useState([]);

  const getCategoryDataAll = useCallback(async () => {
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
  }, [backendUrl, token]);

  useEffect(() => {
    if (token) {
      getCategoryDataAll();
    }
  }, [token, getCategoryDataAll]);

  const value = {
    backendUrl,
    categoryAllData,
    // setLoading,  // ❌ No need to expose setLoading if loader is hidden
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
