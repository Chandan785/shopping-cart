import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();
const router = express.Router();
const SALT_ROUNDS = 10;

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "username & password required" });

    const existing = await User.findOne({ username });
    if (existing) return res.status(409).json({ error: "username already taken" });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({ username, password: hash });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    return res.json({ user: { id: user._id, username: user.username }, token });
  } catch (err) {
    console.error("Signup error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "username & password required" });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

    return res.json({ user: { id: user._id, username: user.username }, token });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
