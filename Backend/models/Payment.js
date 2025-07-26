const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String, required: true }, // e.g. Credit Card, PayPal
  status: { type: String, default: "pending" },    // pending, completed, failed
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
