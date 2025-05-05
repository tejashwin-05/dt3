import React, { useState, useEffect } from 'react';
import { createRazorpayOrder, verifyRazorpayPayment } from '../service/paymentApi';

function RazorpayPayment({ onSuccess, onError }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState('');

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        setScriptLoaded(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        setError("Failed to load payment gateway");
        onError && onError("Failed to load payment gateway");
      };
      document.body.appendChild(script);
    };
    
    if (!window.Razorpay) {
      console.log("Loading Razorpay script...");
      loadRazorpayScript();
    } else {
      console.log("Razorpay script already loaded");
      setScriptLoaded(true);
    }
  }, [onError]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      onError && onError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      console.log(`Creating order for amount: ${amount}`);
      const { data } = await createRazorpayOrder(parseFloat(amount));
      
      if (!data || !data.order) {
        throw new Error('Failed to create payment order: No order data returned');
      }
      
      console.log("Order created successfully:", data);
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_EhZCTJtEwQaTwT',
        amount: data.order.amount,
        currency: data.order.currency || 'INR',
        name: 'Your Company',
        description: 'Payment for services',
        order_id: data.order.id,
        handler: async function(response) {
          console.log("Payment successful, verifying...", response);
          try {
            const verificationResponse = await verifyRazorpayPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });
            
            console.log("Payment verified:", verificationResponse);
            
            if (verificationResponse.data && verificationResponse.data.success) {
              onSuccess && onSuccess(verificationResponse.data);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            console.error("Verification error:", error);
            onError && onError(error.message || 'Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            console.log("Payment modal closed by user");
            setLoading(false);
          }
        }
      };
      
      console.log("Opening Razorpay payment form with options:", options);
      
      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function(response) {
          console.error("Payment failed:", response.error);
          setError(`Payment failed: ${response.error.description}`);
          onError && onError(`Payment failed: ${response.error.description}`);
          setLoading(false);
        });
        razorpay.open();
      } else {
        throw new Error('Razorpay SDK failed to load');
      }
    } catch (error) {
      console.error("Payment error:", error);
      setError(error.message || 'Payment failed');
      onError && onError(error.message || 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Make a Payment</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount (INR)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
          step="1"
        />
      </div>
      
      <button
        onClick={handlePayment}
        disabled={loading || !scriptLoaded}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          loading || !scriptLoaded
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
      
      {!scriptLoaded && (
        <p className="mt-2 text-sm text-gray-500">
          Loading payment gateway...
        </p>
      )}
    </div>
  );
}

export default RazorpayPayment;




