import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";

const OrderReturn = () => {
  const { backendUrl, token } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const [updates, setUpdates] = useState({});

  const fetchAllOrders = useCallback(async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders");
    }
  }, [backendUrl, token]);

  const getOrder = (orderId) => {
    return orders.find((o) => o._id === orderId);
  };

  const handleChange = (orderId, field, value) => {
    setUpdates((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  const handleUpdate = async (orderId) => {
    const data = updates[orderId] || {};

    const status =
      data.status !== undefined
        ? data.status
        : getOrder(orderId)?.returnOrder?.status;

    const comments =
      data.comments !== undefined
        ? data.comments
        : getOrder(orderId)?.returnOrder?.comments;

    if (!status) return toast.error("Select a status");

    try {
      if (status === "completed") {
        const response = await axios.post(
          `${backendUrl}/api/returns/deleteOrder/${orderId}/${status}/${comments}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          fetchAllOrders();
        } else {
          toast.error(response.data.message);
        }
      } else {
        const res = await axios.put(
          `${backendUrl}/api/returns/${orderId}`,
          {
            status: status,
            comments: comments || "",
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          toast.success("Return status updated");
          setUpdates((prev) => ({ ...prev, [orderId]: {} }));
          fetchAllOrders();
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      console.log(err.message)
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token, fetchAllOrders]);

  return (
    <div className="p-4 md:w-full overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Manage Return Orders</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left text-sm">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Reason</th>
            <th className="p-2 border">Comments</th>
            <th className="p-2 border">Update</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((o) => o.returnOrder && o.returnOrder.status)
            .map((order) => (
              <tr
                key={order._id}
                className={`${
                  order.returnOrder.status === "completed"
                    ? "bg-green-300"
                    : ""
                } text-sm border-t`}
              >
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">{order.userId}</td>
                <td className="p-2 border">
                  <select
                    value={
                      updates[order._id]?.status !== undefined
                        ? updates[order._id].status
                        : order.returnOrder.status
                    }
                    onChange={(e) =>
                      handleChange(order._id, "status", e.target.value)
                    }
                    className="border p-1 rounded"
                  >
                    <option value="">Select</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td className="p-2 border">{order.returnOrder.reason}</td>
                <td className="p-2 border">
                  <input
                    type="text"
                    placeholder="Add comments"
                    className="border rounded p-1 w-full"
                    value={
                      updates[order._id]?.comments !== undefined
                        ? updates[order._id].comments
                        : order.returnOrder.comments || ""
                    }
                    onChange={(e) =>
                      handleChange(order._id, "comments", e.target.value)
                    }
                  />
                </td>
                <td className="p-2 border">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => handleUpdate(order._id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderReturn;
