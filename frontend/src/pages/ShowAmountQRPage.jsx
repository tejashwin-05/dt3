import React, { useState, useEffect } from 'react';
import { useSession } from '../context/SessionContext';
import { createPayment } from '../service/paymentApi';
import { getUserProfile } from '../service/userApi';
import { useNavigate } from 'react-router-dom';

function ShowAmountQRPage() {
  const { user } = useSession();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [upiUrl, setUpiUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [paymentId, setPaymentId] = useState(null);

  // Fetch the latest user profile to get the most up-to-date UPI ID
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setProfileLoading(true);
        const { data } = await getUserProfile();
        setUserProfile(data.user);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again.');
      } finally {
        setProfileLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const generateQRCode = async () => {
    // Use the UPI ID from the fetched profile, or fall back to the session user
    const upiId = userProfile?.upiId || user?.upiId;
    
    if (!upiId) {
      setError('UPI ID not configured. Please set up your UPI ID first.');
      return;
    }

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      const { data } = await createPayment(amount, note);
      setQrCodeUrl(data.payment.qrCodeData);
      setUpiUrl(data.payment.upiUrl);
      setPaymentId(data.payment.id);
      setError('');
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError(err.response?.data?.message || 'Failed to generate QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUpiApp = () => {
    if (upiUrl) {
      window.location.href = upiUrl;
    }
  };

  // Get the UPI ID to display, prioritizing the freshly fetched profile
  const displayUpiId = userProfile?.upiId || user?.upiId;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Generate Payment QR
            </h2>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Back to Dashboard
            </button>
          </div>
          
          {profileLoading ? (
            <div className="mb-4 p-3 bg-gray-50 rounded-md flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-sm text-gray-600">Loading your profile...</p>
            </div>
          ) : displayUpiId ? (
            <div className="mb-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-700">
                Your UPI ID: <span className="font-medium">{displayUpiId}</span>
              </p>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-yellow-50 rounded-md">
              <p className="text-sm text-yellow-700">
                You haven't set up your UPI ID yet. Please configure it in your profile.
              </p>
              <button
                onClick={() => navigate('/profile')}
                className="mt-2 text-xs font-medium text-yellow-800 underline"
              >
                Go to Profile Settings
              </button>
            </div>
          )}

          {!qrCodeUrl && (
            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount (INR)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                  Payment Note (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="note"
                    id="note"
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="e.g., Invoice #12345"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 rounded-md">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <button
                type="button"
                onClick={generateQRCode}
                disabled={loading || profileLoading || !displayUpiId}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Generating...' : 'Generate QR Code'}
              </button>
            </div>
          )}

          {qrCodeUrl && (
            <div className="mt-6 text-center">
              <p className="text-sm font-medium text-gray-700 mb-3">
                Scan this QR code to pay ₹{amount}
              </p>
              <div className="flex justify-center">
                <img
                  src={qrCodeUrl}
                  alt="Payment QR Code"
                  className="border rounded-md p-2 max-w-xs"
                />
              </div>
              <div className="mt-4 space-y-3">
                <button
                  onClick={handleOpenUpiApp}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Open UPI App
                </button>
                <button
                  onClick={() => {
                    setQrCodeUrl('');
                    setUpiUrl('');
                    setAmount('');
                    setNote('');
                    setPaymentId(null);
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Create New Payment
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-500">
                This QR code works with any UPI-enabled payment app
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowAmountQRPage;


