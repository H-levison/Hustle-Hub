// routes/tiers.js
// Express route for fetching available loyalty tiers (Bronze, Silver, Gold, Platinum) in Hustle-Hub.

const express = require('express');
const router = express.Router();
const Tier = require('../models/Tier');

// GET /tiers - fetch all tiers
// Returns all available loyalty tiers for use in vendor dashboard and customer UI
router.get('/', async (req, res) => {
  try {
    const tiers = await Tier.find();
    res.json(tiers);
  } catch (err) {
    console.error('Error fetching tiers:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 