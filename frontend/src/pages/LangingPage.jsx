import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedShieldAnimation from '../components/EnhancedShieldAnimation';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-3xl font-bold text-blue-600">SecureShield</div>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full px-4 py-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center mb-20">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-gray-800 leading-tight">
              Protect Your Business With Confidence
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10">
              Our advanced security system shields your business from unauthorized access and cyber threats.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-10 py-4 rounded-lg text-lg hover:bg-blue-700 transition shadow-lg"
            >
              Get Protected Now
            </button>
          </div>
          
          <div className="md:w-1/2">
            {/* Shield Animation */}
            <EnhancedShieldAnimation />
          </div>
        </div>

        {/* Feature cards */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mb-20">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">🔒</div>
            <h3 className="text-2xl font-semibold mb-3">Advanced Protection</h3>
            <p className="text-gray-600 text-lg">Multi-layered security that keeps your sensitive data safe from threats.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-semibold mb-3">Easy Setup</h3>
            <p className="text-gray-600 text-lg">Get your security system up and running in minutes with our simple interface.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-semibold mb-3">24/7 Monitoring</h3>
            <p className="text-gray-600 text-lg">Continuous monitoring with instant alerts for any suspicious activity.</p>
          </div>
        </div>

        {/* CTA section */}
        <div className="max-w-6xl mx-auto bg-blue-50 p-12 rounded-xl shadow-sm text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">Ready to secure your business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Join thousands of businesses that trust our platform for their security needs.</p>
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition text-lg"
          >
            Start Free Trial
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold">SecureShield</div>
              <p className="text-gray-400 mt-2">Your trusted security partner</p>
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

export default LandingPage;
