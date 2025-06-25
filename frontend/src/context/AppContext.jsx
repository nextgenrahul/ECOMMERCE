import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

// frontend
// import { products } from "../assets/images/assets.js";
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
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('')
  const [categoryAllData, setCategoryAllData] = useState([]);

  const getUserData = async () => {

    if (!backendUrl) {
      toast.error("Backend URL is not defined.");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/api/user/data`);

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

  const addToCart = async (itemId, size) => {
    // if (!size) {
    //   toast.error("Select Product Size");
    //   return;
    // }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else { 
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData); 
    if(token){
      try {
        await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers: {token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  };
  
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if(token){
      try {
        await axios.post(backendUrl + "/api/cart/update", {itemId, size, quantity}, {headers: {token}})
      } catch (error) {
        console.log(error);
        toast.error(error.message)
      }
    }
  }


  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get", {}, {headers: {token}});

      if(response){
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if(response.data.success){
        setProducts(response.data.products);
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    getProductsData();
  }, [])

  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'));
    }
  }, [])

   const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((products) => products._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return totalAmount;
  };

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
    navigate,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token, 
    setToken,
    categoryAllData
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
