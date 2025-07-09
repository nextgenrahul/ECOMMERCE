import mongoose from "mongoose";

const colorSchema = new mongoose.Schema({
  colorName: { type: String, required: true, unique: true }, 
  colorHex: { type: String }, 
}, {
  timestamps: true
});

const ColorModel = mongoose.models.Color || mongoose.model("Color", colorSchema);
export default ColorModel;