const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders - Create an order
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, address, items, totalAmount, notes } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !address) {
      return res.status(400).json({ message: 'All customer details are required' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    if (!/^\S+@\S+\.\S+$/.test(customerEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    const order = await Order.create({
      customerName,
      customerEmail,
      customerPhone,
      address,
      items,
      totalAmount,
      notes
    });

    res.status(201).json({ message: 'Order placed successfully!', order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/orders - Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
