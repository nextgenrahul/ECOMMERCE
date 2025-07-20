import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Admin
    slug: { type: String, unique: true }, // Admin
    description: { type: String, required: true }, // Admin
    price: { type: Number, required: true }, // Admin
    originalPrice: { type: Number }, // Admin
    discountPercent: { type: Number }, //Admin
    image: { type: [String], required: true }, //  Admin
    category: { type: String,  }, // Admin
    subCategory: { type: String,  }, // Admin
    productGroupId: { type: String }, // Admin
    sizes: [
        {
            size: { type: String },
            stock: { type: Number }
        }
    ],

    bestseller: { type: Boolean, default: false }, // Admin
    deliveryEstimateDays: { type: Number, default: 3 }, // Admin
    codAvailable: { type: Boolean, default: true }, // Admin

    rating: { type: Number, default: 0 }, // Admin
    reviewCount: { type: Number, default: 0 },  // Admin
    peopleBoughtRecently: { type: Number, default: 0 }, // Based on Sales Data

    tags: { type: [String], default: [] }, // Admin
}, {
    timestamps: true
});

productSchema.pre("save", function (next) {
    if (this.isModified("description")) {
        this.slug = slugify(this.description, {
            lower: true,
            trim: true,
            strict: true
        });
    }
    next();
});

const productModel = mongoose.models.product || mongoose.model("Product", productSchema);
export default productModel;