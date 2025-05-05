import React from 'react';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
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
            <a href="/learn" className="text-gray-700 hover:text-blue-600">Learn</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-semibold">About Us</a>
          </nav>
          
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">About SecureShield</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We're on a mission to protect small businesses from online fraud with simple, 
            powerful security solutions.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center max-w-6xl mx-auto">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                alt="Team working together" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-gray-600 mb-4">
                SecureShield was founded in 2025 by a team of cybersecurity experts and small business owners 
                who recognized a critical gap in the market: affordable, easy-to-use security solutions 
                designed specifically for small businesses.
              </p>
              <p className="text-gray-600 mb-4">
                After witnessing firsthand how devastating online fraud can be for small businesses, 
                our founders set out to create a platform that would provide enterprise-level security 
                without the complexity or high costs.
              </p>
              <p className="text-gray-600">
                Today, SecureShield protects thousands of small businesses across India, helping them 
                process secure payments and prevent fraud with our innovative two-factor authentication system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Mission & Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Security First</h3>
              <p className="text-gray-600 text-center">
                We believe security should never be an afterthought. We build robust protection into 
                everything we do, staying ahead of emerging threats.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Simplicity</h3>
              <p className="text-gray-600 text-center">
                Security doesn't have to be complicated. We create intuitive solutions that anyone can 
                implement, regardless of technical expertise.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Empowerment</h3>
              <p className="text-gray-600 text-center">
                We empower small businesses with the tools and knowledge they need to protect 
                themselves in an increasingly digital world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Leadership Team</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Rajesh Kumar",
                title: "Founder & CEO",
                bio: "Former cybersecurity consultant with 15+ years of experience protecting enterprise systems.",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Priya Sharma",
                title: "CTO",
                bio: "Security engineer and full-stack developer with expertise in building secure payment systems.",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Amit Patel",
                title: "Head of Customer Success",
                bio: "Small business owner turned security advocate, passionate about educating businesses on security.",
                image: "https://randomuser.me/api/portraits/men/67.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-3">{member.title}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Have questions about our services or want to learn more about how we can help protect your business?
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a 
              href="mailto:contact@secureshield.com" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition-colors"
            >
              Email Us
            </a>
            
            <a 
              href="tel:+918001234567" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition-colors"
            >
              Call Us
            </a>
          </div>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-3xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-gray-600">123 Tech Park, Whitefield<br />Bangalore, Karnataka 560066</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-3xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+917989922933<br />Mon-Fri, 9am-6pm IST</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-500 text-3xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-600">contact@secureshield.com<br />support@secureshield.com</p>
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
              <p className="text-gray-400 mt-1">Protecting small businesses since 2025</p>
            </div>
            <div>
              <p className="text-gray-400">© 2025 SecureShield. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;