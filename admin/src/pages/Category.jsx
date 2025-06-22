import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const Category = ({ token }) => {
  const [category, setCategory] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const { backendUrl } = useContext(AdminContext);

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getCategoryData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/category/list`, {
        headers: { token },
      });
      if (response.data.success) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getCategoryData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!category) {
      toast.error("Category must be entered");
      return;
    }
    try {
      const payload = {
        category: capitalizeFirst(category),
      };
      const response = await axios.post(
        `${backendUrl}/api/category/add`,
        payload,
        { headers: { token } }
      );
      if (response.data.success) {
        await getCategoryData();
        setCategory("");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error while adding category:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      toast.error("Id is required");
      return;
    }
    try {
      const response = await axios.delete(
        `${backendUrl}/api/category/delete/${id}`,
        { headers: { token } }
      );
      if (response.data.success) {
        setCategoryData((prev) => prev.filter((c) => c._id !== id)); // ✅ removes from UI instantly

        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error while deleting category:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 bg-white text-black rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Category Manager</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring"
        />
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add
        </button>
      </div>

      {categoryData.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <ul className="space-y-2">
          {categoryData.map((cat, index) => (
            <li
              key={cat._id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded"
            >
              <span>
                <span className="font-medium">{index + 1}.</span> {cat.category}
              </span>
              <button
                onClick={() => handleDelete(cat._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
