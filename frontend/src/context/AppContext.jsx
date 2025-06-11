import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    
    if (!backendUrl) {
      toast.error("Backend URL is not defined.");
      return;
    }

    try {
      axios.defaults.withCredentials = true; 
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      console.log("context", data.data);

      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.data);
                  localStorage.setItem("isLoggedin", "true");

      } else {
        toast.error(data.message || "Could not retrieve user data");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch user data"
      );
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
