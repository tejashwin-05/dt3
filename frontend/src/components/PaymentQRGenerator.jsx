import React, { useState } from 'react';
import { generatePaymentQR } from '../service/paymentApi';

function PaymentQRGenerator() {
  const [payeeName, setPayeeName] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [color, setColor] = useState('#000003');
  const [qrCode, setQrCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const { data } = await generatePaymentQR(
        parseFloat(amount), 
        note, 
        payeeName
      );
      
      setQrCode(data.qrCode);
      setUpiId(data.upiId);
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `payment-qr-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="w-full md:w-1/2">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">UPI ID</label>
            <input
              type="text"
              value={upiId}
              disabled
              placeholder="Your UPI ID will appear here"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Payee Name</label>
            <input
              type="text"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
              placeholder="Enter payee name"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Transaction Amount</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-100 text-gray-500 rounded-l-md">
                ₹
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="flex-grow p-2 border border-gray-300 rounded-r-md"
                required
                min="1"
                step="0.01"
              />
              <span className="inline-flex items-center px-3 border border-l-0 border-gray-300 bg-gray-100 text-gray-500 rounded-r-md">
                IN
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Transaction Note</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter transaction note"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-2">Color</label>
            <div className="flex">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-10 border border-gray-300 rounded-l"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="flex-grow p-2 border border-gray-300 rounded-r"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center"
          >
            {loading ? 'Generating...' : 'Generate QR Code'}
          </button>
          
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col items-center justify-start">
        {qrCode ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-700 mb-4">
                {payeeName.toUpperCase() || 'DEMO PAYEE'}
              </h2>
              
              <div className="border-2 border-gray-300 rounded-lg p-4 inline-block">
                <img src={qrCode} alt="Payment QR Code" className="w-48 h-48" />
              </div>
              
              <p className="mt-4 text-gray-600">{upiId}</p>
              <p className="text-sm text-gray-500 mt-2">Scan and pay with any UPI app</p>
            </div>
            
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center"
            >
              Download QR Code →
            </button>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">QR code will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentQRGenerator;