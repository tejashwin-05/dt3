import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { logoutUser } from '../service/authApi';

function HomePage() {
  const navigate = useNavigate();
  const {user, logout} = useSession();
  
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      if (error.response?.status === 401) {
        console.warn("Session already expired. Logging out anyway.");
      } else {
        console.error("Logout error:", error.message);
      }
    } finally {
      logout();
      navigate("/");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SecureShield</div>
          
          <nav className="hidden md:flex space-x-6">
            <a onClick={() => navigate('/payment')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Payment</a>
            <a onClick={() => navigate('/security')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Security</a>
            <a onClick={() => navigate('/learn')} className="text-gray-700 hover:text-blue-600 cursor-pointer">Learn</a>
            <a onClick={() => navigate('/about')} className="text-gray-700 hover:text-blue-600 cursor-pointer">About Us</a>
          </nav>
          
          <button 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 flex-grow">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">Welcome, {user.username}!</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Secure your transactions with our advanced payment system. We provide industry-leading security with 2FA protection.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/payment')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition-colors"
            >
              Make a Payment
            </button>
            
            <button 
              onClick={() => navigate('/transactions')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition-colors"
            >
              View All Transactions
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div id="payment" className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-3xl mb-4">💸</div>
              <h3 className="text-xl font-semibold mb-2">Fast Payments</h3>
              <p className="text-gray-600">Process transactions quickly and securely with our UPI payment system.</p>
            </div>
            
            <div id="security" className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security</h3>
              <p className="text-gray-600">Your transactions are protected with two-factor authentication.</p>
            </div>
            
            <div id="learn" className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Resources</h3>
              <p className="text-gray-600">Learn about secure payment practices and protect your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About SecureShield</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-center">
            SecureShield is dedicated to providing small businesses with secure payment solutions. 
            Our platform combines ease of use with advanced security features to protect your transactions.
          </p>
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
  )
}

export default HomePage
