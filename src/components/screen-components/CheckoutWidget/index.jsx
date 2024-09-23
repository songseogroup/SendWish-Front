import React, { useEffect, useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const paymentIntent = JSON.parse(localStorage.getItem("paymentIntent"));
 


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements || !paymentIntent) {
      // Stripe.js has not yet loaded or paymentIntent is not available
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: paymentIntent?.client_secret,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      // Handle successful payment confirmation here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {paymentIntent?.client_secret ? (
        <>
          <PaymentElement />
          <button disabled={isProcessing || !stripe || !elements}>
            {isProcessing ? 'Processing...' : 'Pay'}
          </button>
        </>
      ) : (
        <div>Loading payment information...</div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
