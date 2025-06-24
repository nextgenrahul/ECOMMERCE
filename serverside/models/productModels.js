import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: [String], required: true },

    category: { type: String, required: true, index: true },
    subCategory: { type: String, required: true, index: true },

    stock: { type: Number, default: 0 },
    sizes: { type: [String], default: ""},
    isActive: { type: Boolean, default: true },

    bestseller: { type: Boolean, default: false },
    date: { type: Number, required: true }
}, { timestamps: true });

const productModel = mongoose.model.product || mongoose.model("product", productSchema);

export default productModel;
