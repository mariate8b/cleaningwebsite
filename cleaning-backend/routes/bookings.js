const express = require('express');
const router = express.Router();

// POST route for booking
router.post('/api/bookings', (req, res) => {
  const bookingData = req.body;
  // Process booking data (e.g., save to database or Google Sheets)
  console.log('Booking received:', bookingData);
  res.status(200).json({ message: 'Booking successful', data: bookingData });
});

module.exports = router;
