import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

function SecurityPage() {
  const navigate = useNavigate();
  const { user } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SecureShield</div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
            <a href="/payment" className="text-gray-700 hover:text-blue-600">Payment</a>
            <a href="/security" className="text-gray-700 hover:text-blue-600 font-semibold">Security</a>
            <a href="/learn" className="text-gray-700 hover:text-blue-600">Learn</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600">About Us</a>
          </nav>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Main Content */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Security Center</h1>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">Your Security Status</h2>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium">Your account is secure</h3>
                <p className="text-gray-600">Two-factor authentication is enabled</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-600 mb-3">Status: <span className="text-green-600 font-medium">Enabled</span></p>
                <button 
                  onClick={() => navigate('/setup-2fa')}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Reset 2FA
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Password</h3>
                <p className="text-sm text-gray-600 mb-3">Last changed: <span className="font-medium">30 days ago</span></p>
                <button className="text-blue-600 text-sm hover:underline">Change Password</button>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Security Features</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-500 text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Two-Factor Authentication</h3>
                <p className="text-gray-600">Add an extra layer of security to your account with 2FA.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-500 text-3xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-2">Fraud Detection</h3>
                <p className="text-gray-600 mb-3">Our system automatically detects and prevents suspicious transactions.</p>
                <button 
                  onClick={() => navigate('/fraud-detection')}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Verify Transactions
                </button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-blue-500 text-3xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">Device Management</h3>
                <p className="text-gray-600">Monitor and control which devices can access your account.</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Security Tips</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use a strong, unique password for your account</li>
                <li>Never share your OTP or password with anyone</li>
                <li>Be cautious of phishing attempts via email or SMS</li>
                <li>Regularly check your transaction history for unauthorized activity</li>
                <li>Keep your contact information up to date for security alerts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-xl font-bold">SecureShield</div>
              <p className="text-gray-400 mt-1">Protecting small businesses since 2023</p>
            </div>
            <div>
              <p className="text-gray-400">© 2023 SecureShield. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SecurityPage;
