const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  status: { type: String, default: "pending" },
  booking_time: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
