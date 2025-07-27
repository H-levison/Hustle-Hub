// LoyaltyCard.js
// Mongoose model for loyalty cards/tiers assigned to users for a business in Hustle-Hub.

const mongoose = require("mongoose");

// Loyalty card schema for tracking user tier, discount, and requirements per business
const loyaltyCardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // User who owns the card (optional for tier definitions)
  tier: { type: String, default: "Bronze" }, // Tier name (Bronze, Silver, etc.)
  discount: { type: Number, default: 0 }, // Discount percentage for this tier
  minSpend: { type: Number, default: 0 }, // Minimum spend required for this tier
  minCompletedOrders: { type: Number, default: 0 }, // Minimum completed orders required for this tier
  color: { type: String, default: "bg-blue-500" }, // Tailwind color class for UI
  business_id: { type: mongoose.Schema.Types.ObjectId, ref: "Business" }, // Business this tier belongs to
}, { timestamps: true });

module.exports = mongoose.model("LoyaltyCard", loyaltyCardSchema);
