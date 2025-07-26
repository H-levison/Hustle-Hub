const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  business_id: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String },
  stock: { type: Number, default: 0 },
  colors: [{ type: String }],
  sizes: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
