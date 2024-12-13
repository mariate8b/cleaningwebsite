import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { formData } = state || {};

  const handlePayment = async () => {
    try {
      // Simulate payment processing
      await axios.post("/api/payment", { amount: formData.squareFootage * 0.5 });
      alert("Payment successful! Your booking is confirmed.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-white text-center">
      <h2 className="text-2xl font-bold text-blue-600">Complete Your Payment</h2>
      <p className="mt-4">Amount Due: ${(formData.squareFootage * 0.5).toFixed(2)}</p>
      <button
        onClick={handlePayment}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;