import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export default async function auth(req, res, next) {
  try {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "No token provided" });
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") return res.status(401).json({ error: "Bad token format" });
    const token = parts[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload || !payload.id) return res.status(401).json({ error: "Invalid token" });

    const user = await User.findById(payload.id).select("-password");
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ error: "Authentication failed" });
  }
}
