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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    
    // Safety auto-unlock timeout fallback loop
    const cooldownTimeout = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);

    try {
      if (!products || !cartItems) {
        toast.error("Required catalog datasets missing");
        setIsButtonDisabled(false);
        clearTimeout(cooldownTimeout);
        return;
      }

      const orderItems = [];
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
        toast.error("Active transaction envelope empty");
        setIsButtonDisabled(false);
        clearTimeout(cooldownTimeout);
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { withCredentials: true }
          );
          if (response.data.success) {
            setCartItems({});
            localStorage.removeItem("cartData");
            clearTimeout(cooldownTimeout);
            navigate("/orders");
          } else {
            toast.error(response.data.message || "Fulfillment processing rejected");
            setIsButtonDisabled(false);
            clearTimeout(cooldownTimeout);
          }
          break;
        }

        default:
          toast.info("Selected external gateway integration pending deployment");
          setIsButtonDisabled(false);
          clearTimeout(cooldownTimeout);
          break;
      }
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error(error.response?.data?.message || "Logistics exception recorded");
      setIsButtonDisabled(false);
      clearTimeout(cooldownTimeout);
    }
  };

  return (
    <section className="bg-white text-black min-h-screen px-6 md:px-12 max-w-[1600px] mx-auto pt-10 pb-20">
      <form 
        onSubmit={onSubmitHandler} 
        className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start border-t border-neutral-100 pt-8"
      >
        
        {/* LEFT FLANK: Secure Shipping Destination Form */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block mb-1">
              DESTINATION NODE
            </span>
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                onChange={onChangeHandler}
                value={formData.firstName}
                name="firstName"
                className="border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
                placeholder="FIRST NAME"
                type="text"
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.lastName}
                name="lastName"
                className="border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
                placeholder="LAST NAME"
                type="text"
                required
              />
            </div>

            <input
              onChange={onChangeHandler}
              value={formData.email}
              name="email"
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
              placeholder="EMAIL COORDINATES..."
              type="email"
              required
                />
            <input
              onChange={onChangeHandler}
              value={formData.street}
              name="street"
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
              placeholder="STREET ADDRESS ENTRY..."
              type="text"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                onChange={onChangeHandler}
                value={formData.state}
                name="state"
                className="border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
                placeholder="STATE / PROVINCE"
                type="text"
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.city}
                name="city"
                className="border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
                placeholder="CITY CENTER"
                type="text"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                onChange={onChangeHandler}
                value={formData.zipcode}
                name="zipcode"
                className="border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="POSTAL ZIPCODE"
                type="number"
                required
              />
              <input
                onChange={onChangeHandler}
                value={formData.country}
                name="country"
                className="border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
                placeholder="COUNTRY RESIDENCY"
                type="text"
                required
              />
            </div>

            <input
              onChange={onChangeHandler}
              value={formData.phone}
              name="phone"
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              placeholder="PHONE TELEMETRY LINK..."
              required
            />
          </div>
        </div>

        {/* RIGHT FLANK: Ledger Calculations & Payment Selectors */}
        <div className="lg:col-span-2 space-y-10 bg-neutral-50/50 border border-neutral-100 p-6 rounded-sm w-full">
          <div>
            <CartTotal />
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block mb-1">
                GATEWAY CHANNEL
              </span>
              <Title text1="PAYMENT" text2="METHOD" />
            </div>

            <div className="flex flex-col gap-3">
              {/* Stripe option selection */}
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center justify-between border-2 p-3 cursor-pointer transition-all ${
                  method === "stripe" ? "border-black bg-white" : "border-neutral-200 opacity-60 bg-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`h-2 w-2 border border-black ${method === "stripe" ? "bg-black" : "bg-transparent"}`} />
                  <span className="text-[10px] font-black tracking-widest uppercase">STRIPE TRANSFER</span>
                </div>
                <img className="h-4 filter brightness-0" src={assets.stripe_logo} alt="Stripe" />
              </div>

              {/* Razorpay option selection */}
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center justify-between border-2 p-3 cursor-pointer transition-all ${
                  method === "razorpay" ? "border-black bg-white" : "border-neutral-200 opacity-60 bg-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`h-2 w-2 border border-black ${method === "razorpay" ? "bg-black" : "bg-transparent"}`} />
                  <span className="text-[10px] font-black tracking-widest uppercase">RAZORPAY MATRIX</span>
                </div>
                <img className="h-4 filter brightness-0" src={assets.razorpay_logo} alt="Razorpay" />
              </div>

              {/* Cash On Delivery option selection */}
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center justify-between border-2 p-3 cursor-pointer transition-all ${
                  method === "cod" ? "border-black bg-white" : "border-neutral-200 opacity-60 bg-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`h-2 w-2 border border-black ${method === "cod" ? "bg-black" : "bg-transparent"}`} />
                  <span className="text-[10px] font-black tracking-widest uppercase">CASH ON DELIVERY</span>
                </div>
                <span className="text-[9px] font-bold tracking-wider text-neutral-400 font-mono">[COD.01]</span>
              </div>
            </div>

            {/* Form Execution Button Container */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`w-full py-4 text-[10px] font-black tracking-widest uppercase border border-black transition-all ${
                  isButtonDisabled
                    ? "bg-neutral-200 border-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {isButtonDisabled ? "TRANSMITTING MANIFEST..." : "AUTHORIZE TRANSACTION"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-neutral-400 tracking-widest uppercase pt-2">
              <span className="h-1 w-1 bg-neutral-300 rounded-full animate-pulse" />
              <span>SSL SECURED LOGISTICS INBOUND</span>
            </div>
          </div>
        </div>

      </form>
    </section>
  );
};

export default PlaceOrder;