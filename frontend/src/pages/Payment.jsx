import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

// Stripe's publishable key
const stripePromise = loadStripe("pk_live_51QVdu1FxlxnIEELse8iezXJlixn8JEDO5gZhuvQ9rLavJh38Sgk2fl1yT4M2N4pjKMJ1ZOJjRuY7i6ueO66ahB6400ONMEQKN9");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { state } = useLocation();
  const { squareFootage } = state;

  const [isProcessing, setIsProcessing] = useState(false); // For loading state
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true); // Start loading

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setIsProcessing(false); // Stop loading
      setErrorMessage(error.message);
      console.error(error);
    } else {
      try {
        // Make an API call to your server to create the payment intent
        const response = await axios.post("http://localhost:5001/api/payment", {
          paymentMethodId: paymentMethod.id,
          amount: squareFootage * 0.5 * 100, // Convert to cents
        });

        const { clientSecret } = response.data; // Get clientSecret from backend response

        // Confirm the payment using the clientSecret
        const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (confirmError) {
          setIsProcessing(false); // Stop loading
          setErrorMessage(confirmError.message);
          console.error(confirmError);
        } else {
          setIsProcessing(false); // Stop loading
          alert("Payment successful! Your booking is confirmed.");
        }
      } catch (error) {
        setIsProcessing(false); // Stop loading
        setErrorMessage("Payment processing failed. Please try again.");
        console.error("Error processing payment:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white space-y-4">
      <h2 className="text-2xl font-bold text-blue-600">Complete Your Payment</h2>
      <p className="mt-4">Amount Due: ${(squareFootage * 0.5).toFixed(2)}</p>

      {/* Card input element */}
      <CardElement className="p-4 border border-gray-300 rounded-lg" />

      {/* Display error message */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {/* Payment button */}
      <button
        type="submit"
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default Payment;
