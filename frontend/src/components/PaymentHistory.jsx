import React, { useState, useEffect } from 'react';
import { getTransactionHistory } from '../service/paymentApi';

function PaymentHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const { data } = await getTransactionHistory();
      setTransactions(data.transactions);
      setError('');
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to load transaction history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
        <button 
          onClick={fetchTransactions}
          className="ml-4 bg-red-200 px-2 py-1 rounded hover:bg-red-300"
        >
          Retry
        </button>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No transaction history found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-right">Amount</th>
            <th className="py-3 px-6 text-center">Method</th>
            <th className="py-3 px-6 text-center">Status</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {transactions.map((transaction) => (
            <tr key={transaction._id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="font-medium">{transaction.transactionId.substring(0, 10)}...</div>
              </td>
              <td className="py-3 px-6 text-left">
                {formatDate(transaction.createdAt)}
              </td>
              <td className="py-3 px-6 text-right">
                ₹{transaction.amount.toFixed(2)}
              </td>
              <td className="py-3 px-6 text-center">
                {transaction.paymentMethod}
              </td>
              <td className="py-3 px-6 text-center">
                <span className={`py-1 px-3 rounded-full text-xs ${getStatusBadgeClass(transaction.status)}`}>
                  {transaction.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistory;