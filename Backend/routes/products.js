const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const Business = require("../models/Business");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

// POST /products
router.post("/", authMiddleware, async (req, res) => {
  const { name, description, price, category_id, business_id, image, stock, colors, sizes } = req.body;
  console.log("Product creation attempt by:", req.user.email);

  try {
    // Only vendors can add products
    if (!req.user.is_provider) {
      return res.status(403).json({ error: "Only vendors can add products" });
    }

    // Validate required fields
    if (!name || !price || !category_id || !business_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create and save the product
    const newProduct = new Product({
      name,
      description,
      price,
      category_id,
      business_id,
      vendor_id: req.user._id,
      image,
      stock,
      colors,
      sizes,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: {
        id: newProduct._id,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category_id: newProduct.category_id,
        business_id: newProduct.business_id,
        vendor_id: newProduct.vendor_id,
        image: newProduct.image,
        stock: newProduct.stock,
        colors: newProduct.colors,
        sizes: newProduct.sizes,
      },
    });
  } catch (err) {
    console.error("Error creating product:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;


// GET /products
router.get("/", async (req, res) => {
    try {
      const { category, name, store } = req.query;
  
      let filter = {};
  
      // Filter by product name (case-insensitive)
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }
  
      // Filter by category name
      if (category) {
        const matchedCategory = await Category.findOne({
          name: { $regex: category, $options: "i" },
        });
        if (matchedCategory) {
          filter.category_id = matchedCategory._id;
        } else {
          // No matching category, return empty list
          return res.json([]);
        }
      }
  
      // Filter by business/store name
      if (store) {
        const matchedBusiness = await Business.findOne({
          name: { $regex: store, $options: "i" },
        });
        if (matchedBusiness) {
          filter.business_id = matchedBusiness._id;
        } else {
          // No matching business, return empty list
          return res.json([]);
        }
      }
  
      const products = await Product.find(filter);
  
      const response = products.map((p) => ({
        id: p._id,
        name: p.name,
        description: p.description,
        price: p.price,
        category_id: p.category_id,
        business_id: p.business_id,
        vendor_id: p.vendor_id,
        image: p.image,
        stock: p.stock,
        colors: p.colors,
        sizes: p.sizes,
      }));
  
      res.json(response);
    } catch (err) {
      console.error("Error fetching products:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
  
  module.exports = router;

// DELETE /products/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  console.log("Product deletion attempt by:", req.user.email);

  try {
    // Only vendors can delete products
    if (!req.user.is_provider) {
      return res.status(403).json({ error: "Only vendors can delete products" });
    }

    // Find the product and check if it belongs to the current vendor
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the product belongs to the current vendor
    if (product.vendor_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only delete your own products" });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /products/:id - Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const response = {
      id: product._id,
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      business_id: product.business_id,
      vendor_id: product.vendor_id,
      image: product.image,
      stock: product.stock,
      colors: product.colors,
      sizes: product.sizes,
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /products/vendor - Get products for the current vendor
router.get("/vendor", authMiddleware, async (req, res) => {
  try {
    // Only vendors can access this endpoint
    if (!req.user.is_provider) {
      return res.status(403).json({ error: "Only vendors can access this endpoint" });
    }

    const products = await Product.find({ vendor_id: req.user._id });

    const response = products.map((p) => ({
      id: p._id,
      name: p.name,
      description: p.description,
      price: p.price,
      category_id: p.category_id,
      business_id: p.business_id,
      vendor_id: p.vendor_id,
      image: p.image,
      stock: p.stock,
      colors: p.colors,
      sizes: p.sizes,
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching vendor products:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
  