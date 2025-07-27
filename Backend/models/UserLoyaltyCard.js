const mongoose = require("mongoose");

const userLoyaltyCardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  business_id: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  points: { type: Number, default: 0 },
  current_tier: { type: String, default: "Bronze" },
  total_spent: { type: Number, default: 0 },
  orders_count: { type: Number, default: 0 },
  last_order_date: { type: Date },
  is_active: { type: Boolean, default: true }
}, { 
  timestamps: true,
  // Compound index to ensure one loyalty card per user per business
  indexes: [
    { user_id: 1, business_id: 1, unique: true }
  ]
});

module.exports = mongoose.model("UserLoyaltyCard", userLoyaltyCardSchema); 