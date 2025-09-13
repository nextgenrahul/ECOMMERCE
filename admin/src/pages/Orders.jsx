import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/admin_assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [orderUpdates, setOrderUpdates] = useState({});
  const { setLoading } = useContext(AdminContext);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Proper Bearer token
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (orderId) => {
    const { status, reason } = orderUpdates[orderId] || {};
    setLoading(true);

    try {
      let response;
      if (status === "Delivered") {
        response = await axios.post(
          `${backendUrl}/api/order/status`,
          { orderId, status, reason, payment: true },
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Bearer Auth
            },
          }
        );
      } else {
        response = await axios.post(
          `${backendUrl}/api/order/status`,
          { orderId, status, reason },
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ Bearer Auth
            },
          }
        );
      }

      if (response.data.success) {
        toast.success("Order status updated.");
        fetchAllOrders();
      } else {
        toast.error(response.data.message || "Update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 overflow-hidden">
      <h3 className="text-xl font-bold mb-4">Order Page</h3>

      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className={`${
              order.status === "Delivered"
                ? "inset-0 select-none bg-black opacity-30 pointer-events-none"
                : ""
            } relative grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded shadow items-start`}
          >
            {order.status === "Delivered" && (
              <h2 className="absolute top-4 left-1/2 -translate-x-1/2 w-fit text-center text-sm sm:text-base md:text-lg lg:text-xl font-bold text-red-600 bg-white rounded-2xl p-2 z-20 shadow-md">
                Product Delivered | Payment:{" "}
                {order.payment ? "✅ Done" : "⌛ Pending"}
              </h2>
            )}

            {/* Left Column */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={assets.parcel_icon}
                  alt="Parcel"
                  className="h-5 w-5"
                />
                <p className="text-sm font-semibold">Order #{index + 1}</p>
              </div>

              <div className="text-sm text-gray-800 mb-2">
                <p>Order Id : {order._id}</p>
                <p className="font-medium">Customer:</p>
                <p>
                  Name : {order.address.firstName} {order.address.lastName}
                </p>
                <p>
                  Address : {order.address.street}, {order.address.city},{" "}
                  {order.address.state}, {order.address.country} -{" "}
                  {order.address.zipcode}
                </p>
                <p>Phone: {order.address.phone}</p>
              </div>

              <div className="text-sm text-gray-700">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "✅ Done" : "⌛ Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Center Column */}
            <div className="text-sm text-gray-800">
              <p className="font-medium mb-1">Ordered Items:</p>
              {order.items.map((item, idx) => (
                <p key={idx}>
                  {item.name} x {item.quantity} <span>({item.size})</span>
                </p>
              ))}
            </div>

            {/* Right Column */}
            <div className="text-right md:text-left flex flex-col gap-3">
              <p className="text-sm text-gray-800">
                <span className="font-medium">Amount:</span> {currency}
                {order.amount}
              </p>

              <select
                onChange={(e) =>
                  setOrderUpdates((prev) => ({
                    ...prev,
                    [order._id]: {
                      ...(prev[order._id] || {}),
                      status: e.target.value,
                    },
                  }))
                }
                value={orderUpdates[order._id]?.status || order.status}
                className="border border-gray-300 px-2 py-1 rounded w-full"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

              <textarea
                name="reason"
                placeholder="Enter Reason"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-3 resize-none"
                rows="4"
                value={orderUpdates[order._id]?.reason ?? order.reason}
                onChange={(e) =>
                  setOrderUpdates((prev) => ({
                    ...prev,
                    [order._id]: {
                      ...(prev[order._id] || {}),
                      reason: e.target.value,
                    },
                  }))
                }
              />
              <button
                onClick={() => handleSubmit(order._id)}
                disabled={order.status === "Delivered"}
                type="button"
                className={`border-2 rounded-2xl px-3 py-1 text-white ${
                  order.status === "Delivered"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
