const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  product_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
    max: 5 
  },
  comment: { 
    type: String, 
    required: true,
    maxlength: 1000
  },
  user_name: {
    type: String,
    required: true
  }
}, { 
  timestamps: true,
  // Compound index to ensure one review per user per product
  indexes: [
    { user_id: 1, product_id: 1, unique: true }
  ]
});

module.exports = mongoose.model("Review", reviewSchema);
