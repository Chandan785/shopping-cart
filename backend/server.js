import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import itemsRoutes from "./routes/items.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

 

const PORT = process.env.PORT || 4000;
const allowedOrigin = process.env.CORS_ORIGIN;

app.use(cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.options("*", cors());


app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Mongo connection failed:", err.message);
    process.exit(1);
  });
