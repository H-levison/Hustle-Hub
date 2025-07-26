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

// POST /categories
router.post("/", authMiddleware, async (req, res) => {
    const { name } = req.body;
    console.log("Category creation attempt by:", req.user.email);
  
    try {
      // Only providers can create categories
      if (!req.user.is_provider) {
        return res.status(403).json({ error: "Only vendors can create categories" });
      }
  
      if (!name || name.trim() === "") {
        return res.status(400).json({ error: "Category name is required" });
      }
  
      const existing = await Category.findOne({ name: name.trim() });
      if (existing) {
        return res.status(409).json({ error: "Category already exists" });
      }
  
      const newCategory = new Category({ name: name.trim() });
      await newCategory.save();
  
      return res.status(201).json({
        id: newCategory._id,
        name: newCategory.name,
      });
    } catch (err) {
      console.error("Error creating category:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });

// DELETE /categories/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  console.log("Category deletion attempt by:", req.user.email);

  try {
    // Only providers can delete categories
    if (!req.user.is_provider) {
      return res.status(403).json({ error: "Only vendors can delete categories" });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
