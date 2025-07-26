const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true },
  business_id: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
