const express = require("express");
const router = express.Router();
const Address = require("../models/Address");
const authMiddleware = require("../middleware/authMiddleware");

// POST /addresses - add new address (auth required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { street, city, state, zip_code, country } = req.body;
    if (!street || !city || !state || !zip_code || !country) {
      return res.status(400).json({ error: "All address fields are required" });
    }

    const address = new Address({
      user_id: req.user._id,
      street,
      city,
      state,
      zip_code,
      country,
    });

    await address.save();
    res.status(201).json({ message: "Address added", address_id: address._id });
  } catch (err) {
    console.error("Error adding address:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /addresses - get all addresses for current user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const addresses = await Address.find({ user_id: req.user._id });
    res.json(addresses);
  } catch (err) {
    console.error("Error fetching addresses:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /addresses/:addressId - update address by ID (auth required)
router.put("/:addressId", authMiddleware, async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findOne({ _id: addressId, user_id: req.user._id });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    const { street, city, state, zip_code, country } = req.body;

    if (street) address.street = street;
    if (city) address.city = city;
    if (state) address.state = state;
    if (zip_code) address.zip_code = zip_code;
    if (country) address.country = country;

    await address.save();
    res.json({ message: "Address updated" });
  } catch (err) {
    console.error("Error updating address:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /addresses/:addressId - delete address by ID (auth required)
router.delete("/:addressId", authMiddleware, async (req, res) => {
  try {
    const { addressId } = req.params;
    const address = await Address.findOneAndDelete({ _id: addressId, user_id: req.user._id });

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json({ message: "Address deleted" });
  } catch (err) {
    console.error("Error deleting address:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
