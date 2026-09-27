const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();

const authenticateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

router.post("/", authenticateUser, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      deliveryAddress,
      razorpayOrderId,
      razorpayPaymentId,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty.",
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required.",
      });
    }

    const order = await Order.create({
      user: req.userId,
      items,
      totalAmount,
      deliveryAddress,
      razorpayOrderId,
      razorpayPaymentId,
      paymentStatus: "paid",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
});

router.get("/", authenticateUser, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
    });
  }
});

module.exports = router;