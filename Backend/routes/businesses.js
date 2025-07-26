const express = require("express");
const router = express.Router();
const Business = require("../models/Business");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// POST /businesses - create new business (vendors only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    // if (!req.user.is_provider) {
    //   return res.status(403).json({ error: "Only vendors can create a business" });
    // }

    const existingBusiness = await Business.findOne({ owner_id: req.user._id });

    if (existingBusiness) {
      return res.status(400).json({
        error: "You already have a registered business",
        business_id: existingBusiness._id,
      });
    }

    const payload = {
      _id: req.user._id,
      email: req.user.email,
      is_provider: true,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);
    console.log("Token created:", token);

    const { name, description, category_id, whatsapp } = req.body;
    if (!name || !category_id || !whatsapp) {
      return res
        .status(400)
        .json({ error: "Name, category_id, and whatsapp are required" });
    }

    const business = new Business({
      name,
      description,
      category_id,
      owner_id: req.user._id,
      whatsapp,
    });

    await business.save();

    return res.status(201).json({
      token,
      message: "Business created",
      business_id: business._id,
      whatsapp: business.whatsapp,
    });
  } catch (err) {
    console.error("Error creating business:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// PUT /businesses/:businessId - update business (owner only)
router.put("/:businessId", authMiddleware, async (req, res) => {
  const { businessId } = req.params;

  try {
    const business = await Business.findOne({
      _id: businessId,
      owner_id: req.user._id,
    });
    if (!business) {
      return res
        .status(404)
        .json({ error: "Business not found or not owned by user" });
    }

    const { name, description, category_id, logo } = req.body;

    if (name) business.name = name;
    if (description) business.description = description;
    if (category_id) business.category_id = category_id;
    if (logo) business.logo = logo;

    await business.save();

    res.json({ message: "Business updated" });
  } catch (err) {
    console.error("Error updating business:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /businesses/:businessId - get business by id
router.get("/:businessId", async (req, res) => {
  const { businessId } = req.params;

  try {
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    res.json({
      id: business._id,
      name: business.name,
      description: business.description,
      category_id: business.category_id,
      owner_id: business.owner_id,
      whatsapp: business.whatsapp,
      logo: business.logo,
      created_at: business.createdAt, // assuming createdAt field
    });
  } catch (err) {
    console.error("Error fetching business:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /businesses - get all businesses
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find();

    const response = businesses.map((b) => ({
      id: b._id,
      name: b.name,
      description: b.description,
      category_id: b.category_id,
      owner_id: b.owner_id,
      whatsapp: b.whatsapp,
      logo: b.logo,
      created_at: b.createdAt,
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching businesses:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE /businesses/:businessId - delete business (owner only)
router.delete("/:businessId", authMiddleware, async (req, res) => {
  const { businessId } = req.params;

  try {
    const business = await Business.findOne({
      _id: businessId,
      owner_id: req.user._id,
    });

    if (!business) {
      return res
        .status(404)
        .json({ error: "Business not found or not owned by user" });
    }

    await business.deleteOne();

    res.json({ message: "Business deleted" });
  } catch (err) {
    console.error("Error deleting business:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
