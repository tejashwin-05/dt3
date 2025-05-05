import React from 'react';
import { useNavigate } from 'react-router-dom';

function LearnPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SecureShield</div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</a>
            <a href="/payment" className="text-gray-700 hover:text-blue-600">Payment</a>
            <a href="/security" className="text-gray-700 hover:text-blue-600">Security</a>
            <a href="/learn" className="text-gray-700 hover:text-blue-600 font-semibold">Learn</a>
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
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Payment Security Resources</h1>
          
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="bg-blue-600 text-white p-6">
                <h2 className="text-2xl font-semibold">Understanding Online Payment Security</h2>
                <p className="mt-2 text-blue-100">Learn the basics of keeping your business transactions secure</p>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  Online payment security is crucial for small businesses. This guide covers the essential 
                  concepts and best practices to protect your business from fraud and security breaches.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-lg">Authentication vs. Authorization</h3>
                    <p className="text-gray-600">
                      Authentication verifies who you are, while authorization determines what you're allowed to do.
                      Two-factor authentication adds an extra layer of security by requiring two forms of identification.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-lg">Encryption and Data Protection</h3>
                    <p className="text-gray-600">
                      Encryption converts sensitive information into code to prevent unauthorized access.
                      Always ensure your payment processor uses strong encryption standards like TLS 1.2 or higher.
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-lg">PCI DSS Compliance</h3>
                    <p className="text-gray-600">
                      Payment Card Industry Data Security Standard (PCI DSS) is a set of security standards
                      designed to ensure all companies that accept, process, store, or transmit credit card information
                      maintain a secure environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Fraud Prevention" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Common Fraud Schemes</h3>
                  <p className="text-gray-600 mb-4">
                    Learn to identify and protect your business from common fraud tactics targeting small businesses.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Phishing attacks</li>
                    <li>Card testing fraud</li>
                    <li>Chargeback fraud</li>
                    <li>Account takeover</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Security Best Practices" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Security Best Practices</h3>
                  <p className="text-gray-600 mb-4">
                    Implement these security measures to protect your business payments.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Enable two-factor authentication</li>
                    <li>Regularly update passwords</li>
                    <li>Monitor transactions for suspicious activity</li>
                    <li>Keep software and systems updated</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Additional Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#" className="block p-4 bg-white rounded border border-gray-200 hover:border-blue-500 transition">
                  <h4 className="font-medium text-blue-600">Security Checklist</h4>
                  <p className="text-sm text-gray-600">Download our comprehensive security checklist for small businesses</p>
                </a>
                <a href="#" className="block p-4 bg-white rounded border border-gray-200 hover:border-blue-500 transition">
                  <h4 className="font-medium text-blue-600">Webinar: Fraud Prevention</h4>
                  <p className="text-sm text-gray-600">Watch our recorded webinar on preventing payment fraud</p>
                </a>
                <a href="#" className="block p-4 bg-white rounded border border-gray-200 hover:border-blue-500 transition">
                  <h4 className="font-medium text-blue-600">Security FAQ</h4>
                  <p className="text-sm text-gray-600">Answers to common questions about payment security</p>
                </a>
                <a href="#" className="block p-4 bg-white rounded border border-gray-200 hover:border-blue-500 transition">
                  <h4 className="font-medium text-blue-600">Contact Support</h4>
                  <p className="text-sm text-gray-600">Get help from our security experts</p>
                </a>
              </div>
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

export default LearnPage;