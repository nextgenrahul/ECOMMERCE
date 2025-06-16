import mongoose from "mongoose";
import slugify from "slugify";

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

subCategorySchema.pre("save", async function (next) {
    if (!this.isModified("name")) return next();

    let slug = slugify(this.name, { lower: true, strict: true });

    const existing = await mongoose.models.SubCategory.findOne({ slug });
    if (existing && existing._id.toString() !== this._id.toString()) {
        slug = `${slug}-${Date.now()}`;
    }

    this.slug = slug;
    next();
});

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
