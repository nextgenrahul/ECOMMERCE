import axios from "axios";
import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
// import { backendUrl } from "../App";

const Category = ({ token }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedArticle, setSelectedArticle] = useState("");

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [article, setArticle] = useState("");
  const { backendUrl, categoryData } = useContext(AdminContext);

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const addCategoryData = async (e) => {
    e.preventDefault();

    if (!category || !subCategory || !article) {
      toast.error("All values must be entered");
      return;
    }
    try {
      const payload = {
        category: capitalizeFirst(category),
        subCategory: capitalizeFirst(subCategory),
        article: capitalizeFirst(article),
      };

      const response = await axios.post(
        backendUrl + "/api/category/add",
        payload,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setCategory("");
      setSubCategory("");
      setArticle("");
    } catch (error) {
      console.error("Error while adding category:", error);
      toast.error("Something went wrong!");
    }
  };

  // Set list

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("");
    setSelectedArticle("");
  };
  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    setSelectedArticle("");
  };
  const handleArticleChange = (e) => {
    setSelectedArticle(e.target.value);
  };
  const selectedCategoryObj = categoryData.find(
    (cat) => cat.category === selectedCategory
  );
  const subCategories = selectedCategoryObj?.subCategories || [];
  const selectedSubCatObj = subCategories.find(
    (sub) => sub.name === selectedSubCategory
  );
  const articles = selectedSubCatObj?.articles || [];

  return (
    <div className="w-full px-4 sm:px-10 py-6 select-none">
      {/* Form */}
      <div className="w-full mx-auto bg-gray-100 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Category
        </h2>
        <form onSubmit={addCategoryData}>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter Category"
            />
            <input
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter SubCategory"
            />
            <input
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter Article"
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-black text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-800 transition duration-300"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>

      {/* Category List */}
      <div className="w-full mx-auto mt-10 bg-gray-100 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Category List
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="text-center flex-1">
            <h3 className="text-gray-600 mb-2 font-medium">Category</h3>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none "
            >
              <option disabled >Select Category</option>
              {categoryData.map((cat) => {
                return (
                  <option key={cat._id} value={cat.category}>
                    {cat.category}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="text-center flex-1">
            <h3 className="text-gray-600 mb-2 font-medium">SubCategory</h3>
            <select
              value={selectedSubCategory}
              onChange={handleSubCategoryChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none"
            >
              {" "}
              <option>Select SubCategory</option>
              {subCategories.map((sub, i) => {
                return (
                  <option key={i} value={sub.name}>
                    {sub.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="text-center flex-1">
            <h3 className="text-gray-600 mb-2 font-medium">Article</h3>
            <select
              value={selectedArticle}
              onChange={handleArticleChange}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none"
              >

                <option>Select Article</option>
                {articles.map((article, i) => {
                  return (
                    <option key={i} value={article}>
                      {article}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;


// subCategories: [
        //     {
        //         name: { type: String, required: true },
        //         articles: [
        //             {
        //                 type: String, required: true
        //             }
        //         ]
        //     }
        // ]



        const addCategory = async (req, res) => {
  const { category } = req.body;

  try {
    if (!category || category.trim() === "") {
      return res.json({ success: false, message: "Category value is required" });
    }

    const existingCategory = await CategoryModel.findOne({ category });

    if (existingCategory) {
      return res.json({ success: false, message: "Category already exists" });
    }

    const newCategory = new CategoryModel({ category });
    await newCategory.save();

    res.json({ success: true, message: "Category added successfully", data: newCategory });
    
  } catch (error) {
    console.error("Error adding category:", error);
    res.json({ success: false, message: "Server error", error: error.message });
  }
};
const addCateAndSubAndArticle = async (req, res) => {
    try {
        const { category, subCategory, article } = req.body;

        if (!category || !subCategory || !article) {
            return res.json({ success: false, message: "All fields are required" });
        }

        const existingCategory = await CategoryModel.findOne({ category });

        if (!existingCategory) {
            const newCategory = new CategoryModel({
                category,
                subCategories: [
                    {
                        name: subCategory,
                        articles: [article],
                    },
                ],
            });

            await newCategory.save();
            return res
                .json({ success: true, message: "New category added" });
        }

        const subCatIndex = existingCategory.subCategories.findIndex(
            (sub) => sub.name === subCategory
        );

        if (subCatIndex === -1) {
            existingCategory.subCategories.push({
                name: subCategory,
                articles: [article],
            });
        } else {
            const articles = existingCategory.subCategories[subCatIndex].articles;

            if (!articles.includes(article)) {
                articles.push(article);
            } else {
                return res
                    .json({ success: false, message: "Article already exists" });
            }
        }

        await existingCategory.save();
        return res
            .json({ success: true, message: "Category updated successfully" });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
