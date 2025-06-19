import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from '../App';
import { assets } from '../assets/admin_assets/assets.js';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/api/order/status", {orderId, status: e.target.value}, {headers: {token}});
      if(response.data.success){
        await fetchAllOrders()
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(response.data.message)
    }

  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-4">Order Page</h3>

      <div className="flex flex-col gap-6">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border p-4 rounded shadow items-start"
          >
            {/* Left Column - Order & Customer Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <img src={assets.parcel_icon} alt="Parcel" className="h-5 w-5" />
                <p className="text-sm font-semibold">Order #{index + 1}</p>
              </div>

              <div className="text-sm text-gray-800 mb-2">
                <p className="font-medium">Customer:</p>
                <p>{order.address.firstName} {order.address.lastName}</p>
                <p>
                  {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
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

            {/* Center Column - Ordered Items */}
            <div className="text-sm text-gray-800">
              <p className="font-medium mb-1">Ordered Items:</p>
              {order.items.map((item, idx) => (
                <p key={idx}>
                  {item.name} x {item.quantity} <span>({item.size})</span>
                </p>
              ))}
            </div>

            {/* Right Column - Price & Status */}
            <div className="text-right md:text-left flex flex-col gap-3">
              <p className="text-sm text-gray-800">
                <span className="font-medium">Amount:</span> {currency}{order.amount}
              </p>
              <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className="border border-gray-300 px-2 py-1 rounded w-full">
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
