const dns = require("dns");

dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "DecorAI backend is running!",
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 DecorAI backend running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:");
    console.error(error.message);
  });