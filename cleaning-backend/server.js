const express = require('express');
const cors = require('cors');
const bookings = require('./routes/bookings'); // Import the bookings route

const app = express();

// Middleware
app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in req.body
app.use(cors()); // To handle cross-origin requests

// Use the bookings route for /api/bookings
app.use("/api", bookings); // This means bookings routes will be prefixed with /api

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
