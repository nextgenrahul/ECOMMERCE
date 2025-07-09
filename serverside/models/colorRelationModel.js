import mongoose from "mongoose";
const productColorRelationSchema = new mongoose.Schema({
    group_id: { type: String, required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    color_id: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true }
}, {
    timestamps: true
}
)

const ProductColorRelation = mongoose.models.ProductColorRelation || mongoose.model("ProductColorRelation", productColorRelationSchema);
export default ProductColorRelation;
