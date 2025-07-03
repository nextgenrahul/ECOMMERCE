import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        category: { type: String, required: true },
        subCategories: {type: [String], required: true}
    }
    , {
        timestamps: true
    }
);

const CategoryModel = mongoose.model.category || mongoose.model("Category", categorySchema);

export default CategoryModel;