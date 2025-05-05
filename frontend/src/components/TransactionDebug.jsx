import React, { useEffect, useState } from 'react';
import { getTransactionHistory } from '../service/paymentApi';

function TransactionDebug() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTransactionHistory();
      setApiResponse(response);
      setTransactions(response.data.transactions || []);
      setError('');
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Transaction Debug</h2>
      
      <div className="mb-4">
        <button 
          onClick={fetchTransactions}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Transactions
        </button>
      </div>
      
      {loading && <p>Loading...</p>}
      
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}
      
      <div className="mb-4">
        <p className="font-bold">API Response:</p>
        <pre className="bg-gray-100 p-2 rounded overflow-auto max-h-40">
          {JSON.stringify(apiResponse, null, 2)}
        </pre>
      </div>
      
      <div>
        <p className="font-bold">Transactions ({transactions.length}):</p>
        {transactions.length === 0 ? (
          <p className="italic">No transactions found</p>
        ) : (
          <ul className="list-disc pl-5">
            {transactions.map((tx, index) => (
              <li key={tx._id || index} className="mb-2">
                ID: {tx.transactionId}, Amount: ₹{tx.amount}, Status: {tx.status}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TransactionDebug;