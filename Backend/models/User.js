const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define schema
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 120,
  },
  password: {
    type: String,
    required: true,
  },
  is_provider: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  // Relationships (referencing other collections)
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  }],
  businesses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
  }],
  loyalty_card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LoyaltyCard",
  }
});

// Password hashing before saving
userSchema.methods.setPassword = async function (password) {
  if (!password) throw new Error("Password must not be empty");
  const salt = await bcrypt.genSalt(10);
  this.password_hash = await bcrypt.hash(password, salt);
};

// Password comparison
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password_hash);
};

// Create model
const User = mongoose.model("User", userSchema);
module.exports = User;
