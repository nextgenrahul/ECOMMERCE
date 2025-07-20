import mongoose from "mongoose";
const productColorRelationSchema = new mongoose.Schema({
    group_id: { type: String },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
    color_id: { type: mongoose.Schema.Types.ObjectId, ref: "Color" , required: false}
}, {
    timestamps: true
}
)

const ProductColorRelation = mongoose.models.ProductColorRelation || mongoose.model("ProductColorRelation", productColorRelationSchema);
export default ProductColorRelation;
