import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';

function FraudDetectionPage() {
  const navigate = useNavigate();
  const { user } = useSession();
  const [transactionId, setTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!transactionId.trim()) {
      setError('Please enter a transaction ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate API call for fraud detection
      // In a real app, you would call your backend API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate result (random for demo purposes)
      const fraudScore = Math.floor(Math.random() * 100);
      const isSuspicious = fraudScore > 70;
      
      setResult({
        transactionId: transactionId,
        timestamp: new Date().toISOString(),
        fraudScore: fraudScore,
        isSuspicious: isSuspicious,
        riskLevel: isSuspicious ? 'High' : fraudScore > 40 ? 'Medium' : 'Low',
        details: [
          { name: 'IP Location Match', status: Math.random() > 0.3 },
          { name: 'Device Recognition', status: Math.random() > 0.3 },
          { name: 'Unusual Amount', status: Math.random() > 0.7 },
          { name: 'Velocity Check', status: Math.random() > 0.5 },
          { name: 'Pattern Analysis', status: Math.random() > 0.4 }
        ]
      });
    } catch (err) {
      setError('Failed to verify transaction. Please try again.');
      console.error('Verification error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SecureShield</div>
          
          <nav className="hidden md:flex space-x-6">
            <a onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Dashboard</a>
            <a onClick={() => navigate('/payment')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Payment</a>
            <a onClick={() => navigate('/security')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Security</a>
            <a onClick={() => navigate('/learn')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Learn</a>
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
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Fraud Detection</h1>
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Verify Transaction</h2>
            
            <div className="mb-6">
              <label htmlFor="transactionId" className="block text-gray-700 mb-2">Transaction ID</label>
              <div className="flex">
                <input
                  type="text"
                  id="transactionId"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="Enter transaction ID to verify"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleVerify}
                  disabled={loading}
                  className={`px-6 py-2 bg-blue-600 text-white rounded-r-md ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </div>
              {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
            </div>
            
            {result && (
              <div className={`mt-6 p-4 rounded-md ${result.isSuspicious ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                <h3 className="text-lg font-semibold mb-3">Verification Result</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-gray-600 text-sm">Transaction ID</p>
                    <p className="font-medium">{result.transactionId}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Timestamp</p>
                    <p className="font-medium">{new Date(result.timestamp).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Fraud Score</p>
                    <p className="font-medium">{result.fraudScore}/100</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Risk Level</p>
                    <p className={`font-medium ${
                      result.riskLevel === 'High' ? 'text-red-600' : 
                      result.riskLevel === 'Medium' ? 'text-yellow-600' : 
                      'text-green-600'
                    }`}>
                      {result.riskLevel}
                    </p>
                  </div>
                </div>
                
                <h4 className="font-medium mb-2">Verification Checks</h4>
                <ul className="space-y-1">
                  {result.details.map((detail, index) => (
                    <li key={index} className="flex items-center">
                      <span className={`inline-block w-5 h-5 rounded-full mr-2 ${detail.status ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>{detail.name}: {detail.status ? 'Pass' : 'Fail'}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-medium">
                    {result.isSuspicious 
                      ? 'This transaction appears suspicious and may be fraudulent.' 
                      : 'This transaction appears legitimate.'}
                  </p>
                  {result.isSuspicious && (
                    <button className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                      Report Suspicious Activity
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">About Fraud Detection</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">How Our Fraud Detection Works</h3>
              <p className="text-gray-700 mb-4">
                Our advanced fraud detection system uses machine learning algorithms to analyze transactions in real-time.
                We check multiple factors including location, device information, transaction patterns, and more to identify
                potentially fraudulent activities.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-6">
                <div className="text-center">
                  <div className="text-blue-500 text-3xl mb-2">🔍</div>
                  <h4 className="font-semibold mb-1">Real-time Analysis</h4>
                  <p className="text-sm text-gray-600">Instant verification of all transactions</p>
                </div>
                <div className="text-center">
                  <div className="text-blue-500 text-3xl mb-2">🤖</div>
                  <h4 className="font-semibold mb-1">AI-Powered</h4>
                  <p className="text-sm text-gray-600">Machine learning models detect patterns</p>
                </div>
                <div className="text-center">
                  <div className="text-blue-500 text-3xl mb-2">🛡️</div>
                  <h4 className="font-semibold mb-1">Multi-factor</h4>
                  <p className="text-sm text-gray-600">Checks multiple security indicators</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Fraud Prevention Tips</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Always verify transaction details before confirming payments</li>
                <li>Monitor your transaction history regularly for unauthorized activity</li>
                <li>Keep your security credentials and 2FA setup up to date</li>
                <li>Be cautious of unusually large transactions or unfamiliar recipients</li>
                <li>Report suspicious activity immediately to prevent further fraud</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FraudDetectionPage;

