import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/images/assets.js";
import ProductItem from "../components/ProductItem";
import { AppContext } from "../context/AppContext.jsx";
import { Range } from "react-range";

const Collection = () => {
  const [min] = useState(0);
  const [max] = useState(10000);
  const [step] = useState(50);
  const { products, search, showSearch, categoryAllData } =
    useContext(AppContext);

  const [localValues, setLocalValues] = useState([min, max]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products?.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    productsCopy = productsCopy.filter(
      (item) => item.price >= localValues[0] && item.price <= localValues[1]
    );

    setFilterProduct(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts?.slice();
    switch (sortType) {
      case "low-high":
        setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      applyFilter();
      localStorage.setItem("selectedCategories", JSON.stringify(category));
    }
  }, [category, subCategory, search, showSearch, products, localValues]);

  useEffect(() => {
    const savedCategories =
      JSON.parse(localStorage.getItem("selectedCategories")) || [];
    if (savedCategories.length > 0) {
      setCategory(savedCategories);
    }
  }, []);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Section */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categoryAllData?.map((item) => (
              <label
                key={item._id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="category"
                  value={item.category}
                  onChange={toggleCategory}
                  checked={category.includes(item.category || "")}
                />
                {item.category}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
          <Range
            step={step}
            min={min}
            max={max}
            values={localValues}
            onChange={(values) => setLocalValues(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "90%",
                  margin: "30px auto",
                  background: "#ddd",
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "#0ea5e9",
                    borderRadius: "4px",
                    marginLeft: `${
                      ((localValues[0] - min) / (max - min)) * 100
                    }%`,
                    width: `${
                      ((localValues[1] - localValues[0]) / (max - min)) * 100
                    }%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props }) => {
              const { key, ...restProps } = props;
              return (
                <div
                  key={key}
                  {...restProps}
                  style={{
                    ...props.style,
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#0ea5e9",
                    border: "2px solid white",
                    boxShadow: "0 0 3px rgba(0,0,0,0.2)",
                  }}
                />
              );
            }}
          />
          <div className="text-xs text-gray-600 flex justify-between px-3">
            <span>₹{localValues[0]}</span>
            <span>₹{localValues[1]}</span>
          </div>
        </div>
      </div>

      {/* Product Display Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevent">Sort by: Relevent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts?.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
