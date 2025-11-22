import express from "express";
import Item from "../models/Item.js";

const router = express.Router();

// GET /api/items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    return res.json(items);
  } catch (err) {
    console.error("Items fetch error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/items (admin use only)
router.post("/", async (req, res) => {
  try {
    const { name, price, qtyAvailable } = req.body;
    if (!name) return res.status(400).json({ error: "Item name required" });

    const item = new Item({ name, price, qtyAvailable });
    await item.save();

    return res.json(item);
  } catch (err) {
    console.error("Item creation error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
