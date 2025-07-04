// import axios from "axios";
// import React, { useState, useContext } from "react";
// import { toast } from "react-toastify";
// import { AdminContext } from "../context/AdminContext";
// // import { backendUrl } from "../App";

// const Category = ({ token }) => {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedSubCategory, setSelectedSubCategory] = useState("");
//   const [selectedArticle, setSelectedArticle] = useState("");

//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [article, setArticle] = useState("");
//   const { backendUrl, categoryData } = useContext(AdminContext);

//   const capitalizeFirst = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   };

//   const addCategoryData = async (e) => {
//     e.preventDefault();

//     if (!category || !subCategory || !article) {
//       toast.error("All values must be entered");
//       return;
//     }
//     try {
//       const payload = {
//         category: capitalizeFirst(category),
//         subCategory: capitalizeFirst(subCategory),
//         article: capitalizeFirst(article),
//       };

//       const response = await axios.post(
//         backendUrl + "/api/category/add",
//         payload,
//         { headers: { token } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//       setCategory("");
//       setSubCategory("");
//       setArticle("");
//     } catch (error) {
//       console.error("Error while adding category:", error);
//       toast.error("Something went wrong!");
//     }
//   };

//   // Set list

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//     setSelectedSubCategory("");
//     setSelectedArticle("");
//   };
//   const handleSubCategoryChange = (e) => {
//     setSelectedSubCategory(e.target.value);
//     setSelectedArticle("");
//   };
//   const handleArticleChange = (e) => {
//     setSelectedArticle(e.target.value);
//   };
//   const selectedCategoryObj = categoryData.find(
//     (cat) => cat.category === selectedCategory
//   );
//   const subCategories = selectedCategoryObj?.subCategories || [];
//   const selectedSubCatObj = subCategories.find(
//     (sub) => sub.name === selectedSubCategory
//   );
//   const articles = selectedSubCatObj?.articles || [];

//   return (
//     <div className="w-full px-4 sm:px-10 py-6 select-none">
//       {/* Form */}
//       <div className="w-full mx-auto bg-gray-100 p-6 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Add New Category
//         </h2>
//         <form onSubmit={addCategoryData}>
//           <div className="flex flex-col sm:flex-row gap-4">
//             <input
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="text"
//               placeholder="Enter Category"
//             />
//             <input
//               value={subCategory}
//               onChange={(e) => setSubCategory(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="text"
//               placeholder="Enter SubCategory"
//             />
//             <input
//               value={article}
//               onChange={(e) => setArticle(e.target.value)}
//               className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               type="text"
//               placeholder="Enter Article"
//             />
//           </div>

//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-800 transition duration-300"
//             >
//               Add Category
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Category List */}
//       <div className="w-full mx-auto mt-10 bg-gray-100 p-6 rounded-xl shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Category List
//         </h2>

//         <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
//           <div className="text-center flex-1">
//             <h3 className="text-gray-600 mb-2 font-medium">Category</h3>
//             <select
//               value={selectedCategory}
//               onChange={handleCategoryChange}
//               className="w-full border px-4 py-2 rounded-lg focus:outline-none "
//             >
//               <option disabled >Select Category</option>
//               {categoryData.map((cat) => {
//                 return (
//                   <option key={cat._id} value={cat.category}>
//                     {cat.category}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           <div className="text-center flex-1">
//             <h3 className="text-gray-600 mb-2 font-medium">SubCategory</h3>
//             <select
//               value={selectedSubCategory}
//               onChange={handleSubCategoryChange}
//               className="w-full border px-4 py-2 rounded-lg focus:outline-none"
//             >
//               {" "}
//               <option>Select SubCategory</option>
//               {subCategories.map((sub, i) => {
//                 return (
//                   <option key={i} value={sub.name}>
//                     {sub.name}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           <div className="text-center flex-1">
//             <h3 className="text-gray-600 mb-2 font-medium">Article</h3>
//             <select
//               value={selectedArticle}
//               onChange={handleArticleChange}
//               className="w-full border px-4 py-2 rounded-lg focus:outline-none"
//               >

//                 <option>Select Article</option>
//                 {articles.map((article, i) => {
//                   return (
//                     <option key={i} value={article}>
//                       {article}
//                     </option>
//                   );
//                 })}
//             </select>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Category;


// // subCategories: [
//         //     {
//         //         name: { type: String, required: true },
//         //         articles: [
//         //             {
//         //                 type: String, required: true
//         //             }
//         //         ]
//         //     }
//         // ]



//         const addCategory = async (req, res) => {
//   const { category } = req.body;

//   try {
//     if (!category || category.trim() === "") {
//       return res.json({ success: false, message: "Category value is required" });
//     }

//     const existingCategory = await CategoryModel.findOne({ category });

//     if (existingCategory) {
//       return res.json({ success: false, message: "Category already exists" });
//     }

//     const newCategory = new CategoryModel({ category });
//     await newCategory.save();

//     res.json({ success: true, message: "Category added successfully", data: newCategory });
    
//   } catch (error) {
//     console.error("Error adding category:", error);
//     res.json({ success: false, message: "Server error", error: error.message });
//   }
// };
// const addCateAndSubAndArticle = async (req, res) => {
//     try {
//         const { category, subCategory, article } = req.body;

//         if (!category || !subCategory || !article) {
//             return res.json({ success: false, message: "All fields are required" });
//         }

//         const existingCategory = await CategoryModel.findOne({ category });

//         if (!existingCategory) {
//             const newCategory = new CategoryModel({
//                 category,
//                 subCategories: [
//                     {
//                         name: subCategory,
//                         articles: [article],
//                     },
//                 ],
//             });

//             await newCategory.save();
//             return res
//                 .json({ success: true, message: "New category added" });
//         }

//         const subCatIndex = existingCategory.subCategories.findIndex(
//             (sub) => sub.name === subCategory
//         );

//         if (subCatIndex === -1) {
//             existingCategory.subCategories.push({
//                 name: subCategory,
//                 articles: [article],
//             });
//         } else {
//             const articles = existingCategory.subCategories[subCatIndex].articles;

//             if (!articles.includes(article)) {
//                 articles.push(article);
//             } else {
//                 return res
//                     .json({ success: false, message: "Article already exists" });
//             }
//         }

//         await existingCategory.save();
//         return res
//             .json({ success: true, message: "Category updated successfully" });

//     } catch (error) {
//         console.error("Error:", error.message);
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };







// // subcategory code


// {categoryAllData &&
//               categoryAllData
//                 .find((sub) => sub.category === categoryStr)
//                 ?.subCategories.map((item, index) => (
//                   <label className="flex gap-2 cursor-pointer" key={index}>
//                     <input
//                       className="w-3"
//                       type="checkbox"
//                       value={item}
//                       onChange={toggleSubCategory}
//                     />
//                     {item}
//                   </label>
//                 ))}



//   // Colection code
//   import React, { useContext, useEffect, useState } from "react";
// import Title from "../components/Title";
// import { assets } from "../assets/images/assets.js";
// import ProductItem from "../components/ProductItem";
// import { AppContext } from "../context/AppContext.jsx";
// import { Range } from "react-range";

// const Collection = () => {
//   const [min] = useState(0);
//   const [max] = useState(10000);
//   const [step] = useState(50);
//   const { products, search, showSearch, categoryAllData } =
//     useContext(AppContext);
//   const [localValues, setLocalValues] = useState([min, max]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProduct] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relevent");
//   // const [categoryStr, setCategoryStr] = useState("");
//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       // const subObj = setCategoryStr.category === e.target.value
//       // console.log(subObj)
//       // setCategoryStr(e.target.value);
//       setCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setCategory((prev) => [...prev, e.target.value]);
//     }
//     // if(category.includes(e.target.value)){
//     //   const subObj =
//     // }
//     // const selected = e.target.value;
//     // if (category.includes(selected)) {
//     //   setCategory([]);
//     //   setSubCategory();
//     //   setCategoryStr("");
//     // } else {
//     //   setCategory([selected]);
//     //   setSubCategory([]);
//     //   setCategoryStr(selected);
//     // }
//   };

//   const toggleSubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const applyFilter = () => {
//     let productsCopy = products?.slice();
//     if (showSearch && search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy?.filter((item) =>
//         category.includes(item.category)
//       );
//     }

//     if (subCategory?.length > 0) {
//       productsCopy = productsCopy?.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }
//     setFilterProduct(productsCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = filterProducts?.slice();
//     switch (sortType) {
//       case "low-high":
//         setFilterProduct(fpCopy?.sort((a, b) => a.price - b.price));
//         break;
//       case "high-low":
//         setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };
//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, search, showSearch, products]);

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);
//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       {/* Filter Options */}

//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           FILTERS
//           <img
//             className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
//             src={assets.dropdown_icon}
//             alt=""
//           />
//         </p>

//         {/* Category Filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             {categoryAllData &&
//               categoryAllData.map((item, index) => {
//                 return (
//                   <p key={item._id} className="flex  gap-2 ">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         name="category"
//                         value={item.category}
//                         onChange={toggleCategory}
//                         className=" "
//                       />
//                       {item.category}
//                     </label>
//                   </p>
//                 );
//               })}
//           </div>
//         </div>
//         {/* Sub Category filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">TYPE</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             <Range
//               label="Select your value"
//               step={0.1}
//               min={min}
//               max={max}
//               values={localValues}
//               onChange={(values) => setLocalValues(values)}
//               renderTrack={({ props, children }) => (
//                 <div
//                   {...props}
//                   style={{
//                     ...props.style,
//                     height: "6px",
//                     width: "100%",
//                     backgroundColor: "#ccc",
//                   }}
//                 >
//                   {children}
//                 </div>
//               )}
//               renderThumb={({ props }) => (
//                 <div
//                   {...props}
//                   key={props.key}
//                   style={{
//                     ...props.style,
//                     height: "42px",
//                     width: "42px",
//                     backgroundColor: "#999",
//                   }}
//                 />
//               )}
//             />
//           </div>
//         </div>
//       </div>
//       {/*  Right Side */}
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1={"ALL"} text2={"COLLECTIONS"} />
//           {/*  Product Sort */}
//           <select
//             onChange={(e) => setSortType(e.target.value)}
//             className="border-2 border-gray-300 text-sm px-2"
//           >
//             <option value="relavent">Sort by: Relavent</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>
//         {/* Map Products */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
//           {filterProducts?.map((item, index) => (
//             <ProductItem
//               key={index}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default Collection;

// import React, { useContext, useEffect, useState } from "react";
// import Title from "../components/Title";
// import { assets } from "../assets/images/assets.js";
// import ProductItem from "../components/ProductItem";
// import { AppContext } from "../context/AppContext.jsx";
// import { Range } from "react-range";

// const Colledction = () => {
//   const [min] = useState(0);
//   const [max] = useState(10000);
//   const [step] = useState(50);
//   const { products, search, showSearch, categoryAllData } =
//     useContext(AppContext);

//   const [localValues, setLocalValues] = useState([min, max]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProduct] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState("relevent");
//   const [subCategoryData, setSubCategoryData] = useState([]);

//   const toggleCategory = (e) => {
//     const selectedCategory = e.target.value;
//     if (category.includes(selectedCategory)) {
//       setCategory((prev) => prev.filter((item) => item !== selectedCategory));
//       // Remove subcategories related to the unchecked category
//       const relatedSubCats = products
//         .filter((item) => item.category === selectedCategory)
//         .map((item) => item.subCategory);
//       setSubCategory((prev) =>
//         prev.filter((sub) => !relatedSubCats.includes(sub))
//       );
//       // Update subCategoryData based on remaining categories
//       const remainingSubCats = Array.from(
//         new Set(
//           products
//             .filter((item) => category.includes(item.category))
//             .map((item) => item.subCategory)
//             .filter(Boolean)
//         )
//       );
//       setSubCategoryData(remainingSubCats);
//     } else {
//       setCategory((prev) => [...prev, selectedCategory]);
//       // Update subCategoryData with subcategories of the newly selected category
//       const newSubCats = Array.from(
//         new Set(
//           products
//             .filter((item) => item.category === selectedCategory)
//             .map((item) => item.subCategory)
//             .filter(Boolean)
//         )
//       );
//       setSubCategoryData((prev) => Array.from(new Set([...prev, ...newSubCats])));
//     }
//   };

//   const handleSubCategoryChange = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const applyFilter = () => {
//     let productsCopy = products?.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         category.includes(item.category)
//       );
//       const subCats = Array.from(
//         new Set(productsCopy.map((item) => item.subCategory).filter(Boolean))
//       );
//       setSubCategoryData(subCats);
//     }

//     if (subCategory?.length > 0) {
//       productsCopy = productsCopy.filter((item) =>
//         subCategory.includes(item.subCategory)
//       );
//     }

//     productsCopy = productsCopy.filter(
//       (item) => item.price >= localValues[0] && item.price <= localValues[1]
//     );
//     setFilterProduct(productsCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = filterProducts?.slice();
//     switch (sortType) {
//       case "low-high":
//         setFilterProduct(fpCopy.sort((a, b) => a.price - b.price));
//         break;
//       case "high-low":
//         setFilterProduct(fpCopy.sort((a, b) => b.price - a.price));
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, search, showSearch, products, localValues]);

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);

//   return (
//     <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
//       {/* Filter Section */}
//       <div className="min-w-60">
//         <p
//           onClick={() => setShowFilter(!showFilter)}
//           className="my-2 text-xl flex items-center cursor-pointer gap-2"
//         >
//           FILTERS
//           <img
//             className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
//             src={assets.dropdown_icon}
//             alt=""
//           />
//         </p>

//         {/* Category Filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">CATEGORIES</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             {categoryAllData?.map((item) => (
//               <label
//                 key={item._id}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   name="category"
//                   value={item.category}
//                   onChange={toggleCategory}
//                 />
//                 {item.category}
//               </label>
//             ))}
//           </div>
//         </div>
//         {/* Sub Category Filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">SUB CATEGORY</p>
//           <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
//             {subCategoryData?.map((item, index) => (
//               <label
//                 key={index}
//                 className="flex items-center gap-2 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   name="subCategory"
//                   value={item}
//                   onChange={handleSubCategoryChange}
//                 />
//                 {item}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Price Range Filter */}
//         <div
//           className={`border border-gray-300 pl-5 py-3 mt-6 ${
//             showFilter ? "" : "hidden"
//           } sm:block`}
//         >
//           <p className="mb-3 text-sm font-medium">PRICE RANGE</p>
//           <Range
//             step={step}
//             min={min}
//             max={max}
//             values={localValues}
//             onChange={(values) => setLocalValues(values)}
//             renderTrack={({ props, children }) => (
//               <div
//                 {...props}
//                 style={{
//                   ...props.style,
//                   height: "6px",
//                   width: "90%",
//                   margin: "30px auto",
//                   background: "#ddd",
//                   borderRadius: "4px",
//                 }}
//               >
//                 <div
//                   style={{
//                     height: "100%",
//                     background: "#0ea5e9",
//                     borderRadius: "4px",
//                     marginLeft: `${
//                       ((localValues[0] - min) / (max - min)) * 100
//                     }%`,
//                     width: `${
//                       ((localValues[1] - localValues[0]) / (max - min)) * 100
//                     }%`,
//                   }}
//                 />
//                 {children}
//               </div>
//             )}
//             renderThumb={({ props }) => {
//               const { key, ...restProps } = props;
//               return (
//                 <div
//                   key={key}
//                   {...restProps}
//                   style={{
//                     ...props.style,
//                     height: "20px",
//                     width: "20px",
//                     borderRadius: "50%",
//                     backgroundColor: "#0ea5e9",
//                     border: "2px solid white",
//                     boxShadow: "0 0 3px rgba(0,0,0,0.2)",
//                   }}
//                 />
//               );
//             }}
//           />
//           <div className="text-xs text-gray-600 flex justify-between px-3">
//             <span>₹{localValues[0]}</span>
//             <span>₹{localValues[1]}</span>
//           </div>
//         </div>
//       </div>

//       {/* Product Display Section */}
//       <div className="flex-1">
//         <div className="flex justify-between text-base sm:text-2xl mb-4">
//           <Title text1={"ALL"} text2={"COLLECTIONS"} />
//           <select
//             onChange={(e) => setSortType(e.target.value)}
//             className="border-2 border-gray-300 text-sm px-2"
//           >
//             <option value="relevent">Sort by: Relevent</option>
//             <option value="low-high">Sort by: Low to High</option>
//             <option value="high-low">Sort by: High to Low</option>
//           </select>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
//           {filterProducts?.map((item, index) => (
//             <ProductItem
//               key={index}
//               name={item.name}
//               id={item._id}
//               price={item.price}
//               image={item.image}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// ;