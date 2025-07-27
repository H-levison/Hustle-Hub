const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

// GET /reviews/product/:productId - Get all reviews for a product
router.get("/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    
    const reviews = await Review.find({ product_id: productId })
      .sort({ createdAt: -1 }); // Most recent first
    
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /reviews - Create a new review
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { product_id, rating, comment } = req.body;
    
    if (!product_id || !rating || !comment) {
      return res.status(400).json({ error: "Product ID, rating, and comment are required" });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    
    if (comment.length > 1000) {
      return res.status(400).json({ error: "Comment must be less than 1000 characters" });
    }
    
    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ 
      user_id: req.user._id, 
      product_id: product_id 
    });
    
    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this product" });
    }
    
    // Create new review
    const review = new Review({
      user_id: req.user._id,
      product_id: product_id,
      rating: rating,
      comment: comment,
      user_name: req.user.name || req.user.email.split('@')[0] // Use name or email prefix
    });
    
    await review.save();
    
    res.status(201).json({
      message: "Review submitted successfully",
      review: {
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user_name: review.user_name,
        created_at: review.createdAt
      }
    });
    
  } catch (err) {
    console.error("Error creating review:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /reviews/:reviewId - Update a review
router.put("/:reviewId", authMiddleware, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    
    // Check if user owns this review
    if (review.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only edit your own reviews" });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
    
    if (comment.length > 1000) {
      return res.status(400).json({ error: "Comment must be less than 1000 characters" });
    }
    
    review.rating = rating;
    review.comment = comment;
    await review.save();
    
    res.json({
      message: "Review updated successfully",
      review: {
        id: review._id,
        rating: review.rating,
        comment: review.comment,
        user_name: review.user_name,
        created_at: review.createdAt
      }
    });
    
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /reviews/:reviewId - Delete a review
router.delete("/:reviewId", authMiddleware, async (req, res) => {
  try {
    const { reviewId } = req.params;
    
    const review = await Review.findById(reviewId);
    
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }
    
    // Check if user owns this review
    if (review.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "You can only delete your own reviews" });
    }
    
    await Review.findByIdAndDelete(reviewId);
    
    res.json({ message: "Review deleted successfully" });
    
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /reviews/user - Get all reviews by the current user
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ user_id: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching user reviews:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
