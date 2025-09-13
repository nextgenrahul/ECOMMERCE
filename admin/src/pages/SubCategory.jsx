import React, { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const SubCategory = ({ token }) => {
  const { backendUrl } = useContext(AdminContext);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectListCate, setSelectListCate] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const getCategoryData = useCallback(async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/category/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setCategoryData(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch category list");
    }
  }, [backendUrl, token]);

  useEffect(() => {
    getCategoryData();
  }, [getCategoryData]);

  const handleAddSubCategory = useCallback(async () => {
    if (!selectedCategory || !subCategory) {
      return toast.error("Both fields are required");
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/category/addSubcategory`,
        {
          category: selectedCategory,
          subCategory,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setSubCategory("");
        await getCategoryData();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }, [backendUrl, subCategory, token, selectedCategory, getCategoryData ]);

  const getSubCategories = useMemo(() => {
    const found = categoryData.find((c) => c.category === selectListCate);
    return found?.subCategories || [];
  }, [categoryData, selectListCate], );

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">SubCategory Manager</h2>

      <div className="flex gap-2 mb-4">
        <select
          className="border px-3 py-2 rounded w-full"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>Select Category</option>
          {categoryData.map((cat) => (
            <option key={cat._id} value={cat.category}>
              {cat.category}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Enter SubCategory"
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />

        <button
          onClick={handleAddSubCategory}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Add
        </button>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <select
          value={selectListCate}
          onChange={(e) => setSelectListCate(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option>Select Category</option>
          {categoryData.map((cat) => (
            <option key={cat._id}>{cat.category}</option>
          ))}
        </select>

        <select className="border px-3 py-2 rounded">
          <option value="">SubCategory</option>
          {getSubCategories.map((sub, i) => (
            <option key={i}>{sub}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SubCategory;
