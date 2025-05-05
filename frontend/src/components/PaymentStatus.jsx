import React, { useState, useEffect } from 'react';
import { checkPaymentStatus } from '../service/paymentApi';

function PaymentStatus({ paymentId, onPaymentComplete }) {
  const [status, setStatus] = useState('pending');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkCount, setCheckCount] = useState(0);

  useEffect(() => {
    // Only poll if we have a payment ID and haven't completed yet
    if (paymentId && status === 'pending' && checkCount < 30) {
      const checkStatus = async () => {
        try {
          setLoading(true);
          const { data } = await checkPaymentStatus(paymentId);
          setStatus(data.payment.status);
          
          if (data.payment.status === 'completed') {
            onPaymentComplete && onPaymentComplete(data.payment);
          }
        } catch (err) {
          console.error('Error checking payment status:', err);
          setError('Failed to check payment status');
        } finally {
          setLoading(false);
          setCheckCount(prev => prev + 1);
        }
      };

      // Check immediately and then set up interval
      checkStatus();
      
      // Set up polling interval (every 5 seconds)
      const interval = setInterval(checkStatus, 5000);
      
      // Clean up interval on unmount or when status changes
      return () => clearInterval(interval);
    }
  }, [paymentId, status, checkCount, onPaymentComplete]);

  const getStatusDisplay = () => {
    switch (status) {
      case 'completed':
        return (
          <div className="bg-green-50 p-3 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  Payment completed successfully!
                </p>
              </div>
            </div>
          </div>
        );
      case 'failed':
        return (
          <div className="bg-red-50 p-3 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  Payment failed. Please try again.
                </p>
              </div>
            </div>
          </div>
        );
      case 'pending':
        return (
          <div className="bg-yellow-50 p-3 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-yellow-800">
                  {loading ? 'Checking payment status...' : 'Waiting for payment...'}
                </p>
                <p className="mt-1 text-xs text-yellow-700">
                  Please complete the payment using your UPI app
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-4">
      {getStatusDisplay()}
      {error && (
        <div className="mt-2 bg-red-50 p-3 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
          <button
            onClick={() => {
              setError('');
              setCheckCount(0); // Reset check count to restart polling
            }}
            className="mt-2 text-xs font-medium text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}
      {status === 'pending' && checkCount >= 30 && (
        <div className="mt-2 bg-gray-50 p-3 rounded-md">
          <p className="text-sm text-gray-700">
            Payment status check timed out. The payment might still be processing.
          </p>
          <button
            onClick={() => setCheckCount(0)} // Reset check count to restart polling
            className="mt-2 text-xs font-medium text-blue-600 underline"
          >
            Check again
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentStatus;
