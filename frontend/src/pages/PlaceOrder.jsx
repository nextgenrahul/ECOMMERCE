import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/images/assets.js";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(AppContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    e.preventDefault();

    // 👇 disable button for 5 seconds after click
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
    try {
      if (!products || !cartItems) {
        toast.error("Missing required data");
        return;
      }

      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            orderItems.push({
              productId,
              size,
              quantity,
            });
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { withCredentials: true }
          );
          if (response.data.success) {
            setCartItems({});
            localStorage.removeItem("cartData");

            navigate("/orders");
          } else {
            toast.error(response.data.message || "Failed to place order");
          }
          break;
        }

        default:
          toast.info("Selected payment method is not yet implemented");
          break;
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-10"
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.firstName}
            name="firstName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First Name"
            type="text"
            required
          />
          <input
            onChange={onChangeHandler}
            value={formData.lastName}
            name="lastName"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last Name"
            type="text"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={formData.email}
          name="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Type Email"
          type="email"
          required
        />
        <input
          onChange={onChangeHandler}
          value={formData.street}
          name="street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
          type="text"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.state}
            name="state"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
            type="text"
            required
          />
          <input
            onChange={onChangeHandler}
            value={formData.city}
            name="city"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
            type="text"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            value={formData.zipcode}
            name="zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="ZipCode"
            type="number"
            required
          />
          <input
            onChange={onChangeHandler}
            value={formData.country}
            name="country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
            type="text"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          value={formData.phone}
          name="phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          required
        />
      </div>

      {/* Right Side */}
      <div className="mt-8">
        <div className="my-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""
                  }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""
                  }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="Razorpay"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""
                  }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`px-16 py-3 text-sm ${isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white"
                }`}
            >
              {isButtonDisabled ? "PLEASE WAIT..." : "PLACE ORDER"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
