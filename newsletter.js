const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// POST /api/newsletter - Subscribe to newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Check for duplicate
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'This email is already subscribed' });
    }

    const subscription = await Newsletter.create({ email });
    res.status(201).json({ message: 'Subscribed successfully!', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
