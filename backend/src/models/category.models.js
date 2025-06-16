import mongoose from "mongoose";
import slugify from "slugify";
import path from "path";

const categorySchema = new mongoose.Schema({
    name: {
        required: true,
        trim: true,
        unique: true,
        index: true,
        type: String
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true,
        default: path.join("/uploads/categories", "dummy_category.png")
    }
}, {
    timestamps: true
});

categorySchema.pre("save", async function (next) {
    if (!this.isModified("name")) return next();
    let slug = slugify(this.name, { lower: true, strict: true });

    const existingCategory = await mongoose.models.Category.findOne({ slug });
    if (existingCategory && existingCategory._id.toString() !== this._id.toString()) {
        slug = `${slug}-${Date.now()}`;
    }
    this.slug = slug;
    next();
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;
