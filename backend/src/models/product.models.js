import mongoose from "mongoose";
import slugify from "slugify";
const productSchema = new mongoose.Schema(
    {
        product_name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        slug: {
            type: String,
            trim: true,
            unique: true,
            lowercase: true,
            index: true
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        sub_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
        },
        tag: {
            type: [String],
            default: [],
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        price_type: {
            type: String,
            enum: ["fixed", "variable", "negotiable"],
            default: "fixed",
        },
        total_price: {
            type: Number,
            min: 0,
        },
        special_price: {
            type: Number,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },
        availability: {
            type: String,
            enum: ["in stock", "out of stock", "preorder"],
            default: "in stock",
        },
        status: {
            type: String,
            enum: ["active", "inactive", "draft"],
            default: "active",
        },
        images: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProductImage",
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true
    }
);

// Auto-generate and ensure unique slug before saving
productSchema.pre("save", async function (next) {
    if (!this.isModified("product_name")) return next();
    let slug = slugify(this.product_name, { lower: true, strict: true });

    const existing = await mongoose.models.Product.findOne({ slug });
    if (existing && existing._id.toString() !== this._id.toString()) {
        slug = `${slug}-${Date.now()}`;
    }
    this.slug = slug;
    next();
});     

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;