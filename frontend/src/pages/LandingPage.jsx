import React from "react";
import { Mail, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-900 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-purple-700 to-blue-600 text-white shadow-md">
        <div className="flex items-center space-x-2 text-xl font-bold">
          <ShieldCheck className="text-green-300" />
          <span>SecurePay</span>
        </div>
        <ul className="hidden md:flex space-x-6">
          <li className="hover:text-green-200 cursor-pointer">Home</li>
          <li className="hover:text-green-200 cursor-pointer">Security</li>
          <li className="hover:text-green-200 cursor-pointer">Learn</li>
          <li className="hover:text-green-200 cursor-pointer">About Us</li>
        </ul>
        <button className="bg-green-300 text-purple-900 font-semibold px-4 py-2 rounded-xl shadow hover:bg-green-200 transition">Get Started</button>
      </nav>

      {/* Hero Section - Full height */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between p-6 md:p-16 bg-purple-100 flex-grow">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-800 mb-4">
            Securing Small Businesses from Online Frauds
          </h1>
          <p className="text-xl text-blue-800 italic mb-8">
            "Peace of mind in every transaction."
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-xl hover:bg-purple-700 transition shadow-lg">
              Learn More
            </button>
            <button className="bg-green-300 text-purple-900 px-6 py-3 rounded-xl hover:bg-green-400 transition shadow-lg">
              Get Started
            </button>
          </div>
        </div>
        <img
          src="https://cdn.dribbble.com/users/181234/screenshots/16167673/media/7499f502d03df2ffdf66b83f0f67600c.gif"
          alt="Payment Security"
          className="w-full md:w-1/2 mb-8 md:mb-0"
        />
      </section>

      {/* Payment App Logos */}
      <section className="flex flex-wrap justify-center items-center gap-10 py-12 bg-white">
        {[
          "google-pay",
          "phonepe",
          "paytm",
          "bhim",
          "amazon-pay",
          "upi",
        ].map((name) => (
          <img
            key={name}
            src={`https://logo.clearbit.com/${name}.com`}
            alt={`${name} logo`}
            className="w-20 h-20 object-contain"
          />
        ))}
      </section>

      {/* User Testimonials */}
      <section className="bg-green-50 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">User Experience</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Ravi K.", quote: "Now I sleep peacefully knowing my shop is safe online." },
            { name: "Anjali M.", quote: "Fast, secure, and user-friendly. Just perfect." },
            { name: "Manoj P.", quote: "Scam alerts saved me from big trouble!" },
          ].map((user) => (
            <div key={user.name} className="bg-white p-6 rounded-xl shadow-md w-72">
              <p className="text-gray-800 italic">“{user.quote}”</p>
              <div className="mt-4 font-semibold text-purple-700">{user.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-purple-100 py-12 px-6">
        <h2 className="text-3xl text-center font-bold text-blue-900 mb-6">Contact Us</h2>
        <form className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
            <Mail className="inline mr-2" /> Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-800 to-blue-700 text-white text-center p-6">
        &copy; 2025 SecurePay. All rights reserved.
      </footer>
    </div>
  );
}

