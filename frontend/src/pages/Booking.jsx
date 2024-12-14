import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    squareFootage: "",
    description: "",
    paymentMethod: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/bookings", bookingData);

      // Check if the response status is 200 or 201 (successful)
      if (response.status === 200 || response.status === 201) {
        if (bookingData.paymentMethod === "online") {
          navigate("/payment", { state: bookingData }); // Redirect to the Stripe payment page
        } else {
          alert("Booking confirmed! Pay cash upon arrival.");
        }
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to book. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold text-blue-600">Book a Cleaning</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.address}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="squareFootage"
          placeholder="Square Footage"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.squareFootage}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Cleaning Description"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.description}
          onChange={handleChange}
          required
        ></textarea>
        <select
          name="paymentMethod"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select Payment Method</option>
          <option value="online">Online</option>
          <option value="cash">Cash</option>
        </select>
        <input
          type="date"
          name="date"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          min="08:00"
          max="18:00"
          className="block w-full p-2 border border-gray-300 rounded-lg"
          value={bookingData.time}
          onChange={handleChange}
          required
        />
        <button type="submit" className="block w-full p-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Booking;
