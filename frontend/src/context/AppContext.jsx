import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// frontend
import { products } from "../assets/images/assets.js";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});

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
    products,
    currency,
    setShowSearch,
    showSearch,
    search,
    setSearch,
    cartItems,
    setCartItems,
    delivery_fee,
    navigate
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
