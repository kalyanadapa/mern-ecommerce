// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";

// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from your React app's URL
  credentials: true,  
  allowedHeaders: ['Content-Type', 'Authorization'],              // Allow credentials like cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE']  // Allow these HTTP methods
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Define the upload directory
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, "uploads");

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("Uploads folder created!");
}

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});


app.use("/uploads", express.static(uploadDir));

app.listen(port, () => console.log(`Server running on port: ${port}`));
