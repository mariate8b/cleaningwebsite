import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function Payment({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error('Stripe error:', error);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/payment', {
        amount: amount * 100, // Convert to cents
        paymentMethodId: token.id,
      });

      console.log('Payment successful:', response);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

export default Payment;
