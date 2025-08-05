import mongoose from 'mongoose';


const returnSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  trackingNumber: { type: String },
  
  reason: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
},{
    timestamps: true
}
);


const ReturnModel = mongoose.model('Return', returnSchema);
export default ReturnModel;