import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, default: 0 },
  qtyAvailable: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Item", ItemSchema);
