import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { Link } from "react-router-dom";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const { setLoading } = useContext(AdminContext);
  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
   <>
  <p className="mb-2 text-lg font-semibold text-gray-700">All Products List</p>

  <div className="w-full overflow-x-auto">
    <div className="min-w-[950px] flex flex-col gap-2">
      {/* -------Table Header */}
      <div className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_2fr_0.5fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium">
        <b className="text-left">Image</b>
        <b className="text-left">Name</b>
        <b className="text-left">Group ID</b>
        <b>Category</b>
        <b className="text-center">Price</b>
        <b className="text-center">Action</b>
        <b className="text-center">Delete</b>
      </div>

      {/* -------Table Rows */}
      {list.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr_2fr_0.5fr] items-center gap-2 py-2 px-3 border-b text-sm bg-white hover:bg-gray-50 transition"
        >
          <img
            className="w-12 h-12 object-cover rounded"
            src={item.image?.find((img) => !!img) || "/placeholder.jpg"}
            alt={item.name || "product"}
          />
          <p className="truncate">{item.name}</p>
          <p className="truncate text-gray-600">{item.productGroupId}</p>
          <p className="text-gray-600">{item.category}</p>
          <p className="font-medium">
            {currency}
            {item.price}
          </p>
          <div className="flex items-center justify-center gap-2">
            <Link to={`/add?groupId=${item.productGroupId}`}>
              <button className="bg-purple-500 hover:bg-purple-600 text-white text-xs px-3 py-2 rounded shadow-sm">
                Color Group
              </button>
            </Link>
          </div>
          <p
            onClick={() => removeProduct(item._id)}
            className="text-center cursor-pointer text-lg text-red-500 hover:scale-110 transition"
          >
            X
          </p>
        </div>
      ))}
    </div>
  </div>
</>

  );
};

export default List;
