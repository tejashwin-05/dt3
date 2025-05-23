import React, { useState } from 'react';
import { useSession } from '../context/SessionContext';
import { useNavigate } from 'react-router-dom';
import RazorpayPayment from '../components/RazorpayPayment';

const PaymentPage = () => {
  const { user } = useSession();
  const navigate = useNavigate();
  
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState('');

  const handlePaymentSuccess = (data) => {
    console.log("Payment successful:", data);
    setPaymentSuccess(true);
    setPaymentData(data);
    setError('');
  };

  const handlePaymentError = (errorMessage) => {
    console.error("Payment error:", errorMessage);
    setError(errorMessage);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Payment</h1>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            {paymentSuccess ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                <span className="block sm:inline">Payment successful! Thank you for your payment.</span>
                <div className="mt-4">
                  <h3 className="font-semibold">Transaction Details:</h3>
                  <p>Transaction ID: {paymentData?.transaction?.id || 'N/A'}</p>
                  <p>Payment ID: {paymentData?.transaction?.paymentId || 'N/A'}</p>
                  <p>Status: {paymentData?.transaction?.status || 'N/A'}</p>
                </div>
                <button
                  onClick={() => setPaymentSuccess(false)}
                  className="mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                >
                  Make Another Payment
                </button>
                <button
                  onClick={() => navigate('/fraud-detection')}
                  className="px-4 py-2 ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                >
                  Fraud Verification
                </button>
              </div>
            ) : (
              <RazorpayPayment 
                onSuccess={handlePaymentSuccess} 
                onError={handlePaymentError} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;




