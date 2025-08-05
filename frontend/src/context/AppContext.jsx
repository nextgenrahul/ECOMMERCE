import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
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
  const [categoryAllData, setCategoryAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState({});

  const getUserData = async () => {
    if (!backendUrl) return toast.error("Backend URL is not defined.");
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setIsLoggedin(true);
        setUserData(data.data);
        localStorage.setItem("isLoggedin", "true");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch user data"
      );
    }
  };

  const addToCart = async (itemId, size) => {
    if(!size ){
      return toast.error("Sizes are requried");
    }
    if(!itemId ){
      return toast.error("Item Id are requried");
    }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (isLoggedin) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }

    return totalCount;
  };
  const updateQuantity = async (itemId, size, quantity, productSizesArr) => {
    const selectedSizeObj = productSizesArr.find((s) => s.size === size);

    if (!selectedSizeObj) {
      toast.error("Invalid size selected!");
      return;
    }

    const stock = selectedSizeObj.stock;

    if (quantity > stock) {
      toast.error(`Only ${stock} items in stock for size ${size}`);
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);

    if (isLoggedin) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { withCredentials: true }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      localStorage.setItem("cartData", JSON.stringify(cartData));
    }
  };

  const getUserCart = async () => {
    if (isLoggedin) {
      try {
        const response = await axios.get(backendUrl + "/api/cart/get", {
          withCredentials: true,
        });
        if (response.data.success) {
          setCartItems(response.data.cartData);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const localCart = localStorage.getItem("cartData");
      if (localCart) {
        setCartItems(JSON.parse(localCart));
      } else {
        setCartItems({});
      }
    }
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
    const init = async () => {
      const res = await axios.get(backendUrl + "/api/user/auth-check", {
        withCredentials: true,
      });

      if (res.data?.loggedIn) {
        setIsLoggedin(true);
        setUserName(res.data.user);
        console.log("User is logged in");
      } else {
        console.log("User is not logged in");
      }
    };

    init();
  }, []);

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo?.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const getCategoryDataAll = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/category/list`, {
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
    if (isLoggedin) {
      getCategoryDataAll();
      getUserCart();
    }
  }, [isLoggedin]);

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
    categoryAllData,
    getUserCart,
    setLoading,
    userName,
  };

  return (
    <>
      {loading && <Loader />}
      <AppContext.Provider value={value}>{children}</AppContext.Provider>;
    </>
  );
};
