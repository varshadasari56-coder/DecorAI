const express = require("express");
const products = require("../data/products");

const router = express.Router();

// Get all available products
router.get("/", (req, res) => {
  try {
    const availableProducts = products.filter(
      (product) => product.availability
    );

    res.json({
      success: true,
      count: availableProducts.length,
      products: availableProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products.",
    });
  }
});

// Get a single product by ID
router.get("/:id", (req, res) => {
  try {
    const product = products.find(
      (item) => String(item.id) === String(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product.",
    });
  }
});

module.exports = router;