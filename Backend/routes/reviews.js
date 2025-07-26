const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

// POST /reviews - create a review (auth required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { business_id, rating, comment } = req.body;
    if (!business_id || !rating) {
      return res.status(400).json({ error: "business_id and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "rating must be between 1 and 5" });
    }

    const review = new Review({
      user_id: req.user._id,
      business_id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review created", review_id: review._id });
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /reviews/:businessId - get all reviews for a business
router.get("/:businessId", async (req, res) => {
  try {
    const reviews = await Review.find({ business_id: req.params.businessId })
      .populate("user_id", "first_name last_name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
