import express from "express";
import auth from "../middleware/auth.js";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Item from "../models/Item.js";

const router = express.Router();

// POST /api/order/checkout
router.post("/checkout", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.item");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItems = cart.items.map((cartItem) => ({
      item: cartItem.item._id,
      quantity: cartItem.quantity,
      priceAtPurchase: cartItem.item.price
    }));

    const total = orderItems.reduce((sum, i) => sum + i.priceAtPurchase * i.quantity, 0);

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      total
    });

    await order.save();

    // Clear cart
    cart.items = [];
    cart.status = "ordered";
    await cart.save();

    return res.json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Checkout failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/order/my
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("items.item");
    return res.json(orders);
  } catch (err) {
    console.error("Order fetch failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
