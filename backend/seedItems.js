import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item.js";

dotenv.config();

const items = [
  { name: "Laptop", price: 60000, qtyAvailable: 10 },
  { name: "Mobile", price: 20000, qtyAvailable: 15 },
  { name: "Headphones", price: 3000, qtyAvailable: 50 },
  { name: "Smart Watch", price: 5000, qtyAvailable: 20 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    await Item.deleteMany({});
    await Item.insertMany(items);

    console.log("Items seeded");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seed();
