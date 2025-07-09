import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
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
  const [article, setArticle] = useState("");
  const { categoryAllData, backendUrl, setLoading } = useContext(AdminContext);
  const [colorPlate, setColorPlate] = useState(false);
  const [colorData, setColorData] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [stockValues, setStockValues] = useState({});

  const [searchParams] = useSearchParams();
  const existingGroupId = searchParams.get("groupId");
  // console.log(existingGroupId)
  // const
  const getSubCategoryobj = () => {
    const found = categoryAllData.find((sub) => sub.category === category);
    return found ? found.subCategories : [];
  };

  const getColorPlate = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/color/list", {
        headers: {
          token: token,
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
  };

  // const toggleSize = (size) => {
  //   setSizes((prev) =>
  //     prev.includes(size)
  //       ? prev.filter((item) => item !== size)
  //       : [...prev, size]
  //   );
  // };

  const toggleSize = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter((s) => s !== size));
      const updatedStock = { ...stockValues };
      delete updatedStock[size];
      setStockValues(updatedStock);
    } else {
      setSizes([...sizes, size]);
    }
  };
  // console.log(stockValues);

  // console.log("formatsize" , formattedSizes)

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const finalGroupId =
        colorPlate && (existingGroupId || Date.now().toString());
      const formData = new FormData();
      const formattedSizes = sizes.map((size) => ({
        [size]: Number(stockValues[size] || 0),
      }));
      // console.log(formattedSizes);
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
      formData.append("bestSeller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(formattedSizes));
      formData.append("color_id", selectedColorId);
      formData.append("productGroupId", finalGroupId);
      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setSizes([]);
        setStockValues({});
        setBestSeller(false);
        setColorPlate(false);
        setSelectedColorId(null);
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
    getColorPlate();
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Image Section is Done */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="preview"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="preview"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="preview"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="preview"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      {/* Product Name And description is Done */}
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
            type="text"
            placeholder="Write Content Here"
          />
        </div>
      </div>

      {/* Product Category is Done */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="w-full">
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="">select</option>
            {categoryAllData?.map((item, index) => {
              return <option key={item._id}>{item.category}</option>;
            })}
          </select>
        </div>
        <div className="w-full">
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option>Select</option>
            {getSubCategoryobj().map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
        </div>
        <div className="w-full">
          <p className="mb-2">Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2"
            type="Number"
            placeholder="Enter Price"
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Original Price</p>
          <input
            onChange={(e) => setOriginal(e.target.value)}
            value={original}
            className="w-full px-3 py-2"
            type="Number"
            placeholder="Enter Original Price"
          />
        </div>
      </div>

      {/* Size Set Done */}
      {category === "Clothing" ||
      category === "cloths" ||
      category === "cloth" ? (
        <div className="mb-6">
          <p className="mb-2 font-medium text-gray-700">Cloths Size</p>

          {/* Responsive Grid instead of flex */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {["XS", "S", "M", "L", "XL", "XXL", "2XL", "3XL"].map((size) => (
              <div key={size} className="relative group">
                <div onClick={() => toggleSize(size)}>
                  <p
                    className={`${
                      sizes.includes(size) ? "bg-pink-200" : "bg-slate-200"
                    } px-4 py-2 text-center cursor-pointer rounded shadow transition hover:scale-105`}
                  >
                    {size}
                  </p>
                </div>

                {/* Stock input — visible always for selected sizes */}
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
      ) : null}

      {/* Color Set */}
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
            {colorData.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedColorId(item._id)}
                className={`p-2 shadow-md rounde flex items-center gap-2 cursor-pointer transition 
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

      {/* deliveryEstimateDays */}
      {/* Cash ON Delivery */}
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
        {/* <div className="w-full">
          <p className="mb-2">Add COD</p>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div> */}
      </div>

      {/* Best seller */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) => setBestSeller(e.target.checked)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to BesetSeller
        </label>
      </div>
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
