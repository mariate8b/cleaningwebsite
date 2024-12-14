const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const stripe = require('stripe')('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'); // Replace with your Stripe secret key
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Google Sheets API setup
const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY });
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

// Middleware
app.use(express.json());
app.use(cors());

// Payment route
app.post('/api/payment', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd', // Adjust to your preferred currency
      payment_method: paymentMethodId,
      confirm: true, // Automatically confirm the payment
    });

    // Send the clientSecret back to the frontend
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send({ error: error.message });
  }
});

// Booking route
app.post('/api/bookings', async (req, res) => {
  const { name, email, phone, address, squareFootage, description, paymentMethod, date, time } = req.body;

  console.log('Booking received:', {
    name,
    email,
    phone,
    address,
    squareFootage,
    description,
    paymentMethod,
    date,
    time,
  });

  // Write booking data to Google Sheets
  try {
    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A2', // Modify this to match the desired range in your sheet
      valueInputOption: 'RAW',
      resource: {
        values: [
          [name, email, phone, address, squareFootage, description, paymentMethod, date, time], // The booking data to insert
        ],
      },
    };

    // Insert data into the Google Sheet
    await sheets.spreadsheets.values.append(request);

    console.log('Booking successfully saved to Google Sheets');

    // Respond with a success message
    res.status(201).send({ message: 'Booking created successfully and saved to Google Sheets!' });
  } catch (error) {
    console.error('Error saving booking to Google Sheets:', error);
    res.status(500).send({ error: 'Failed to save booking. Please try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
