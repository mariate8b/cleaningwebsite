const express = require('express');
const router = express.Router();
const appendToSheet = require('../googleSheets'); // Assuming appendToSheet is in googleSheets.js

// Define the bookings POST route
router.post('/bookings', async (req, res) => {
  const { name, email, phone, address, squareFootage, description, paymentMethod, date, time } = req.body;

  // Validation: Ensure all fields are provided
  if (!name || !email || !phone || !address || !squareFootage || !description || !paymentMethod || !date || !time) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const price = squareFootage * 0.5; // Calculate price based on square footage
  const bookingData = [name, email, phone, address, squareFootage, description, price, paymentMethod, date, time];

  try {
    await appendToSheet(bookingData); // Append data to Google Sheets
    res.status(200).json({ message: 'Booking successful!' });
  } catch (error) {
    console.error('Error saving booking:', error.message);
    res.status(500).json({ message: 'Error saving booking. Please try again later.' });
  }
});

module.exports = router;
