const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appendToSheet = require('./googleSheets');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Booking endpoint
app.post('/bookings', async (req, res) => {
  const { name, email, phone, address, squareFootage, description, paymentMethod, date, time } = req.body;
  const price = squareFootage * 0.5; // Calculate the price based on square footage

  // Prepare data for Google Sheets
  const bookingData = [name, email, phone, address, squareFootage, description, price, paymentMethod, date, time];

  try {
    await appendToSheet(bookingData);
    res.status(200).json({ message: 'Booking successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving booking' });
  }
});
app.use(bookingsRoute);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/payment', async (req, res) => {
  const { amount, paymentMethodId } = req.body;

  try {
    // Create a payment intent with the amount and payment method ID
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',  // Use appropriate currency
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.status(200).json({
      message: 'Payment successful',
      paymentIntent,
    });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
