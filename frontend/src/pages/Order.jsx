import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Order = () => {
  const { backendUrl, currency, products } = useContext(AppContext);

  const [reason, setReason] = useState("");
  const [orderMainAllData, setOrderMainAllData] = useState([]);
  const [showModal, setShowModal] = useState(null); // store order ID
  const [showResonError, setShowReasonError] = useState(false);

  const loadOrderData = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        setOrderMainAllData(response.data.orders.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders", error);
      toast.error("Unable to load orders");
    }
  };

  const handleReturnSubmit = async (orderId, userId) => {
    try {
      if (!reason) {
        return setShowReasonError(true);
      }

      const response = await axios.post(backendUrl + "/api/returns", {
        userId,
        orderId,
        reason,
      });

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }

      setShowModal(null);
      setReason("");
      setShowReasonError(false);
      loadOrderData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  useEffect(() => {
    if (reason.trim() !== "") {
      setShowReasonError(false);
    }
  }, [reason]);

  return (
    <div className="border-t pt-16  px-10">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      {orderMainAllData.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No orders found.</p>
      ) : (
        orderMainAllData.map((order, index) => (
          <div
            key={index}
            className="py-6 border-t border-b text-gray-700 flex flex-col gap-4"
          >
            <p className="text-sm text-gray-500 font-semibold">
              Order ID: {order._id}
            </p>

            {order.items.map((item, idx) => {
              const productItem = products.find(
                (p) => p._id === item.productId
              );
              if (!productItem) return null;

              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start gap-4 border-b pb-4"
                >
                  <Link to={`/product/${productItem.slug}`}>
                    <img
                      className="w-20 h-20 object-cover"
                      src={productItem.image[0]}
                      alt={productItem.name}
                    />
                  </Link>
                  <div className="text-sm sm:text-base">
                    <p className="font-medium">{productItem.name}</p>
                    <p>Size: {item.size}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      Price: {currency}
                      {productItem.price * item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-2">
              <div className="text-sm sm:text-base">
                {order.returnOrder?.status ? null : (<p>
                  Status: <span className="text-green-600">{order.status}</span>
                </p>)}

                <p>Payment: {order.paymentMethod}</p>
                <p>Date: {new Date(order.date).toDateString()}</p>

                {order.returnOrder && order.returnOrder.status ? (
                  <div className="mt-2">
                    <p>
                      {" "}
                      Return Status :
                      <span className="ml-1 text-green-600">
                        {order.returnOrder.status}
                      </span>{" "}
                    </p>
                    <p>Reason: {order.returnOrder.reason}</p>
                    <p>Comments: {order.returnOrder.comments}</p>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => loadOrderData()}
                  className="border-2 px-4 py-2 text-sm font-medium rounded-sm bg-gray-100 border-gray-500 text-gray-700"
                >
                  Track Order
                </button>

                {(!order.returnOrder || !order.returnOrder.status) && (
                  <button
                    onClick={() => {
                      setShowModal(order._id);
                      setReason("");
                    }}
                    className="border px-4 py-2 text-sm font-medium rounded-sm bg-green-500 text-white"
                  >
                    Return Order
                  </button>
                )}
              </div>
            </div>

            {/* Modal for return reason */}
            {showModal === order._id && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Enter Reason
                  </h2>

                  <textarea
                    className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows="5"
                    placeholder="Write your reason here..."
                    value={reason}
                    required
                    onChange={(e) => setReason(e.target.value)}
                  />
                  {showResonError && (
                    <p className="text-red-500 mt-1">Reason is required</p>
                  )}

                  <div className="flex justify-end gap-3 mt-5">
                    <button
                      onClick={() => {
                        setShowModal(null);
                        setReason("");
                        setShowReasonError(false);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        handleReturnSubmit(order._id, order.userId)
                      }
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Order;
