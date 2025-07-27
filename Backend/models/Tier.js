// Tier.js
// Mongoose model for loyalty tiers (Bronze, Silver, Gold, Platinum) in Hustle-Hub.

const mongoose = require('mongoose');

// Tier schema defines the available loyalty tiers for vendors to assign to customers
const tierSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., Bronze, Silver, Gold, Platinum
  displayName: { type: String }, // Human-readable name
  description: { type: String }, // Description of the tier
  color: { type: String, default: 'bg-blue-500' } // Tailwind color class for UI
});

module.exports = mongoose.model('Tier', tierSchema); 