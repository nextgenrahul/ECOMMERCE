import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [trackOrder, setTrackOrder] = useState(null);
  const { backendUrl, products } = useContext(AppContext);

  const trackSubmitButton = async (e) => {
    e.preventDefault();
    if (orderId.trim() === "") {
      return toast.error("Please enter an order ID");
    }
    try {
      const response = await axios.post(`${backendUrl}/api/order/trackorder`, {
        orderId,
      });
      if (response.data.success) {
        setTrackOrder(response.data.trackData);
      } else {
        toast.warning(response.data.message || "Order not found.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while tracking the order.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={trackSubmitButton}
        className="w-full max-w-sm p-4 bg-white shadow-md rounded mb-6"
      >
        <input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          name="orderId"
          type="text"
          placeholder="Enter Order ID"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Track Order
        </button>
      </form>

      {trackOrder && (
        <div className="w-full max-w-md bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2 border-b text-center">
            Order Items
          </h2>
          <h2 className="text-lg font-semibold mb-2 border-b text-center">
            <strong>Reason Text :</strong> {trackOrder?.reason}
          </h2>

          {trackOrder.items.map((item, index) => {
            const product = products.find((p) => p._id === item.productId);

            if (!product) return null;

            return (
              <div key={index} className="border-b py-2">
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                  <strong>Order Status:</strong> {trackOrder.status}
                </p>
                <p>
                  <strong>Price:</strong> ₹{product.price}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
