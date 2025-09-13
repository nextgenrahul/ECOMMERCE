import CategoryModel from "../models/categoryModel.js";


const getCategoryList = async (req, res) => {
    try {
        const data = await CategoryModel.find({});
        
        if (!data || data.length === 0) {
            return res.json({ success: false, message: "No categories found" });
        }

        return res.json({ success: true, message: "Data fetched successfully", data });

    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.json({ success: false, message: error.message });
    }
};

const addCategory = async (req, res) => {
    const { category } = req.body;
    try {
        if (!category) {
            return res.json({ success: false, message: "Category Value required" })
        }
        const existingCategory = await CategoryModel.findOne({ category });
        if (existingCategory) {
            return res.json({ success: false, message: "Category already exists." });
        }
        const newCategory = new CategoryModel({
            category
        });
        await newCategory.save();
        res.json({ success: true, message: "category added succesfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const addSubcategory = async (req, res) => {
    const { category, subCategory } = req.body;
    try {
        if (!category) {
            return res.json({ success: false, message: "Category Value required" })
        }
        const existingCategory = await CategoryModel.findOne({ category });
        console.log(existingCategory)
        if (existingCategory) {
            if (existingCategory.subCategories.includes(subCategory)) {
                return res.json({ success: false, message: "SubCategory already exists" });

            }
            existingCategory.subCategories.push(subCategory)
        }
        await existingCategory.save();
        res.json({ success: true, message: "SubCategory created successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.json({ success: false, message: "Id don't found" })
        }
        const deletedCategory = await CategoryModel.findByIdAndDelete({ _id: id });
        if (!deletedCategory) {
            return res.json({ success: false, message: "Category not found" });
        }
        res.json({ success: true, message: "Category deleted successfully" });

    } catch (error) {
        console.error("Error deleting category:", error);
        res.json({ success: false, message: "Server error" });
    }

}

export { addCategory, getCategoryList, deleteCategory, addSubcategory };
