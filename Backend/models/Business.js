const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  whatsapp: { type: String, required: true },
  logo: { type: String }, // Store logo image URL
}, { timestamps: true });

module.exports = mongoose.model("Business", businessSchema);
