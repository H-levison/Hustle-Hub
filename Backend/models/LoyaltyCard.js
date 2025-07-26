const mongoose = require("mongoose");

const loyaltyCardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  points: { type: Number, default: 0 },
  tier: { type: String, default: "Bronze" },
  discount: { type: Number, default: 0 },
  minSpend: { type: Number, default: 0 },
  color: { type: String, default: "bg-blue-500" },
  business_id: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
}, { timestamps: true });

module.exports = mongoose.model("LoyaltyCard", loyaltyCardSchema);
