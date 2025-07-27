const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

// GET /categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories from MongoDB

    const formattedCategories = categories.map((c) => ({
      id: c._id,
      name: c.name,
    }));

    return res.json(formattedCategories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /categories/:id
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json({
      id: category._id,
      name: category.name,
    });
  } catch (err) {
    console.error("Error fetching category:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /categories - DISABLED: Categories are predefined
router.post("/", authMiddleware, async (req, res) => {
  return res.status(403).json({ 
    error: "Category creation is disabled. Categories are predefined and cannot be created or modified." 
  });
});

// DELETE /categories/:id - DISABLED: Categories are predefined
router.delete("/:id", authMiddleware, async (req, res) => {
  return res.status(403).json({ 
    error: "Category deletion is disabled. Categories are predefined and cannot be created or modified." 
  });
});

module.exports = router;
