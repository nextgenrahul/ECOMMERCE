import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { AppContext } from "../context/AppContext";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/images/assets";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    isLoggedin,
  } = useContext(AppContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        const forSlut = products.find((e) => e._id === items);
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              slug: forSlut.slug,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="mb-3">
        <Title text1={"Your"} text2={"CART"} />
      </div>
      <div>
        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center px-4">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-700">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-2 mb-6">
              Looks like you haven't added anything yet.
            </p>
            <Link
              to="/"
              className="px-5 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          cartData?.map((item, index) => {
            const productData = products.find(
              (product) => product._id === item._id
            );
            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <Link to={`/product/${productData.slug}`}>
                    <img
                      className="w-16 sm:w-20"
                      src={productData?.image[0]}
                      alt=""
                    />
                  </Link>
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData?.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData?.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border border-gray-50 bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value),
                          productData.sizes
                        )
                  }
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt=""
                />
              </div>
            );
          })
        )}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sw:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            {isLoggedin ? (
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
