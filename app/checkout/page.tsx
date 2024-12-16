'use client';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function PaymentPage() {
  const searchParams = useSearchParams();
  const reservationId = searchParams.get('bookingId');
  const [clientSecret, setClientSecret] = useState('');

  const retrievePaymentIntent = useCallback(async () => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId: reservationId }),
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve payment intent');
      }

      const data = await response.json();
      setClientSecret(data.paymentIntentSecret || data.clientSecret);
    } catch (error) {
      console.error(error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  }, [reservationId]);

  useEffect(() => {
    if (reservationId) {
      retrievePaymentIntent();
    }
  }, [reservationId, retrievePaymentIntent]);

  const paymentOptions = {
    clientSecret,
    appearance: {
      /* Customize appearance here if needed */
    },
  };

  return (
    <div id='payment-container'>
      {clientSecret && (
        <Elements stripe={stripePromise} options={paymentOptions}>
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
}

function PaymentForm() {
  return (
    <form id='payment-form'>
      <PaymentElement />
      <button>Submit Payment</button>
    </form>
  );
}

export default PaymentPage;