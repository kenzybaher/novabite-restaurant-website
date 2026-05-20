const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST /api/reservations - Create a reservation
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, time, partySize, specialRequests } = req.body;

    // Server-side validation
    if (!name || !email || !phone || !date || !time || !partySize) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    if (partySize < 1 || partySize > 20) {
      return res.status(400).json({ message: 'Party size must be between 1 and 20' });
    }

    const reservation = await Reservation.create({
      name, email, phone, date, time, partySize, specialRequests
    });

    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/reservations - Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
