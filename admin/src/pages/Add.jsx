import React, { useCallback, useContext, useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { useSearchParams } from "react-router-dom";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [original, setOriginal] = useState("");
  const [bestseller, setBestSeller] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [gender, setGender] = useState("");
  const { categoryAllData, backendUrl, setLoading } = useContext(AdminContext);
  const [colorPlate, setColorPlate] = useState(false);
  const [colorData, setColorData] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [stockValues, setStockValues] = useState({});

  const [searchParams] = useSearchParams();
  const existingGroupId = searchParams.get("groupId");

  const getSubCategoryobj = useCallback(() => {
    const found = categoryAllData.find((sub) => sub.category === category);
    return found ? found.subCategories : [];
  }, [category, categoryAllData]);

  const getColorPlate = useCallback(async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/color/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setColorData(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [backendUrl, token]);

  const toggleSize = useCallback(
    (size) => {
      if (sizes.includes(size)) {
        setSizes(sizes.filter((s) => s !== size));
        const updatedStock = { ...stockValues };
        delete updatedStock[size];
        setStockValues(updatedStock);
      } else {
        setSizes([...sizes, size]);
      }
    },
    [sizes, stockValues]
  );


  const onSubmitHandler = useCallback(async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const finalGroupId = colorPlate ? existingGroupId || Date.now().toString() : "";
      const formData = new FormData();
      const formattedSizes = sizes.map((size) => ({
        size: size,
        stock: Number(stockValues[size] || 0),
      }));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("originalPrice", original);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("gender", gender);
      formData.append("sizes", JSON.stringify(formattedSizes));
      formData.append("bestSeller", bestseller ? "true" : "false");
      formData.append("productGroupId", finalGroupId);
      formData.append("color_id", selectedColorId);
      formData.append("deliveryDate", deliveryDate);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);

        // reset form
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setOriginal("");
        setCategory("");
        setSubCategory("");
        setSizes([]);
        setStockValues({});
        setBestSeller(false);
        setColorPlate(false);
        setSelectedColorId(null);
        setDeliveryDate("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [
    name,
    description,
    image1,
    image2,
    image3,
    image4,
    price,
    original,
    category,
    subCategory,
    sizes,
    stockValues,
    bestseller,
    colorPlate,
    gender,
    existingGroupId,
    selectedColorId,
    deliveryDate,
    backendUrl,
    token,
    setLoading
  ]);


  useEffect(() => {
    getColorPlate();
  }, [getColorPlate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Image Section */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[setImage1, setImage2, setImage3, setImage4].map((setter, index) => {
            const imgState = [image1, image2, image3, image4][index];
            return (
              <label key={index} htmlFor={`image${index + 1}`}>
                <img
                  className="w-20"
                  src={!imgState ? assets.upload_area : URL.createObjectURL(imgState)}
                  alt="preview"
                />
                <input
                  onChange={(e) => setter(e.target.files[0])}
                  type="file"
                  id={`image${index + 1}`}
                  hidden
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Name & Description */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="text"
            placeholder="Type Here"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product Description</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            placeholder="Write Content Here"
          />
        </div>
      </div>

      {/* Category */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="w-full">
          <p className="mb-2">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="">Select</option>
            {categoryAllData?.map((item) => (
              <option key={item._id} value={item.category}>
                {item.category}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <p className="mb-2">Sub Category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="">Select</option>
            {getSubCategoryobj().map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <p className="mb-2">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2"
            type="number"
            placeholder="Enter Price"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Original Price</p>
          <input
            onChange={(e) => setOriginal(e.target.value)}
            value={original}
            className="w-full px-3 py-2"
            type="number"
            placeholder="Enter Original Price"
          />
        </div>
      </div>
      {/* Man Women Selction*/}
      {/* Man Women Selection */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="w-full">
          <p className="mb-2">Gender</p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="">Select</option>
            <option value="man">Man</option>
            <option value="woman">Woman</option>
            <option value="child">Child</option>
          </select>
        </div>
      </div>

      {/* Sizes (only for clothing) */}
      {(category.toLowerCase() === "clothing" ||
        category.toLowerCase() === "cloths" ||
        category.toLowerCase() === "cloth") && (
          <div className="mb-6">
            <p className="mb-2 font-medium text-gray-700">Clothing Size</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {["XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL"].map((size) => (
                <div key={size} className="relative group">
                  <div onClick={() => toggleSize(size)}>
                    <p
                      className={`${sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                        } px-4 py-2 text-center cursor-pointer rounded shadow transition hover:scale-105`}
                    >
                      {size}
                    </p>
                  </div>
                  {sizes.includes(size) && (
                    <input
                      type="number"
                      min="0"
                      placeholder="Stock"
                      value={stockValues[size] || ""}
                      onChange={(e) =>
                        setStockValues((prev) => ({
                          ...prev,
                          [size]: e.target.value,
                        }))
                      }
                      className="mt-2 w-full px-3 py-1 border rounded bg-white shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Color Selection */}
      <div className="mt-2">
        <div className="flex gap-2">
          <input
            type="checkbox"
            checked={colorPlate}
            onChange={(e) => setColorPlate(e.target.checked)}
            id="colorSet"
          />
          <label htmlFor="colorSet">Select Color</label>
        </div>
        {colorPlate && (
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {colorData.map((item) => (
              <div
                key={item._id}
                onClick={() => setSelectedColorId(item._id)}
                className={`p-2 shadow-md flex items-center gap-2 cursor-pointer transition 
                ${selectedColorId === item._id ? "ring-2 ring-blue-500" : ""}`}
              >
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: item.colorHex }}
                ></div>
                <div>
                  <p className="text-sm font-medium">{item.colorName}</p>
                  <p className="text-xs text-gray-500">{item.colorHex}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delivery Estimate Date */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="w-full">
          <p className="mb-2">Delivery Estimate Date</p>
          <input
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            className="w-full max-w-[500px] px-3 py-2"
            type="date"
          />
        </div>
      </div>

      {/* Best Seller */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) => setBestSeller(e.target.checked)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
