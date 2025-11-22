import express from "express";
import auth from "../middleware/auth.js";
import Cart from "../models/Cart.js";
import Item from "../models/Item.js";

const router = express.Router();

// GET /api/cart/my
router.get("/my", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.item");

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
      await cart.save();
    }

    return res.json(cart);
  } catch (err) {
    console.error("Cart fetch failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/cart/add
router.post("/add", auth, async (req, res) => {
  try {
    const { itemId } = req.body;
    if (!itemId) return res.status(400).json({ error: "itemId required" });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: "Item not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existing = cart.items.find((i) => String(i.item) === itemId);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.items.push({ item: itemId, quantity: 1 });
    }

    cart.updatedAt = Date.now();
    await cart.save();

    return res.json({ message: "Item added to cart", cart });
  } catch (err) {
    console.error("Cart add failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/cart/update
router.post("/update", auth, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    if (!itemId || quantity == null) {
      return res.status(400).json({ error: "itemId & quantity required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const found = cart.items.find((i) => String(i.item) === itemId);
    if (!found) return res.status(404).json({ error: "Item not in cart" });

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => String(i.item) !== itemId);
    } else {
      found.quantity = quantity;
    }

    cart.updatedAt = Date.now();
    await cart.save();

    return res.json(cart);
  } catch (err) {
    console.error("Cart update failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/cart/remove/:itemId
router.delete("/remove/:itemId", auth, async (req, res) => {
  try {
    const itemId = req.params.itemId;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter((i) => String(i.item) !== itemId);
    cart.updatedAt = Date.now();

    await cart.save();
    return res.json(cart);
  } catch (err) {
    console.error("Cart remove failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
