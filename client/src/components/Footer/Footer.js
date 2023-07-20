import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const Footer = () => {
  const [loading, setLoading] = useState(false);

  const handleDonation = async () => {
    setLoading(true);
    const stripe = await loadStripe(process.env.STRIPE_PK);

    try {
      // Make a request to your backend server endpoint to create a PaymentIntent
      const response = await fetch('http://localhost:4000/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 500 }), // 500 cents corresponds to $5
      });

      const { sessionId } = await response.json();
      console.log('sessionId', sessionId);

      // Initiate the payment flow
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error('Error during donation:', error);
      }
    } catch (error) {
      console.error('Error fetching PaymentIntent:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>Support our cause with a $5 donation:</p>
        <button onClick={handleDonation} disabled={loading}>
          {loading ? 'Processing...' : 'Donate $5'}
        </button>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: '#f1f1f1',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    marginTop: '50px'
  },
  container: {
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Footer;
