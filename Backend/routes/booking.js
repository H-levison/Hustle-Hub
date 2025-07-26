const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const authMiddleware = require("../middleware/authMiddleware");

// GET /bookings/user/:userId/bookings
router.get("/user/:userId/bookings", authMiddleware, async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.find({ user_id: userId });

    const response = bookings.map(b => ({
      id: b._id,
      service_id: b.service_id,
      booking_time: b.booking_time,
      status: b.status
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /bookings
router.post("/", authMiddleware, async (req, res) => {
  const { user_id, service_id } = req.body;

  try {
    const service = await Service.findById(service_id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const booking = new Booking({
      user_id,
      service_id
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking_id: booking._id,
      status: booking.status
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
