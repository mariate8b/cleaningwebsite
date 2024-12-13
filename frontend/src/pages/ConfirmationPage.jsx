import React from "react";
import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const bookingDetails = location.state || {};

  return (
    <div className="p-8 bg-white">
      <h2 className="text-2xl font-bold text-blue-600">Booking Confirmation</h2>
      <div className="mt-6 space-y-4">
        <p>Thank you for booking with us! Here are the details:</p>

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <p><strong>Name:</strong> {bookingDetails.name || 'N/A'}</p>
          <p><strong>Email:</strong> {bookingDetails.email || 'N/A'}</p>
          <p><strong>Phone:</strong> {bookingDetails.phone || 'N/A'}</p>
          <p><strong>Address:</strong> {bookingDetails.address || 'N/A'}</p>
          <p><strong>Square Footage:</strong> {bookingDetails.squareFootage || 'N/A'} sqft</p>
          <p><strong>Description:</strong> {bookingDetails.description || 'N/A'}</p>
          <p><strong>Payment Method:</strong> {bookingDetails.paymentMethod || 'N/A'}</p>
          <p><strong>Date:</strong> {bookingDetails.date || 'N/A'}</p>
          <p><strong>Time Slot:</strong> {bookingDetails.time || 'N/A'}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-lg shadow-md mt-6">
          <p>Someone from our team will contact you shortly to confirm your booking.</p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;

