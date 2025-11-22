import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  quantity: { type: Number, default: 1, min: 1 }
}, { _id: false });

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  items: [CartItemSchema],
  status: { type: String, enum: ["active", "ordered"], default: "active" },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Cart", CartSchema);
