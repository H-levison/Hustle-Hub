const express = require("express");
const router = express.Router();
const Service = require("../models/Service"); // adjust the path as needed
require("dotenv").config();

// GET /services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find(); // Fetch all services from MongoDB

    const formattedServices = services.map((s) => ({
      id: s._id,
      name: s.name,
      description: s.description,
      price: s.price,
      business_id: s.business_id,
    }));

    return res.json(formattedServices);
  } catch (err) {
    console.error("Error fetching services:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
