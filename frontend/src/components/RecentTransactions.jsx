import React, { useEffect, useState } from 'react';
import { getUserTransactions } from '../service/paymentApi';

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await getUserTransactions();
        setTransactions(data.transactions);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (transactions.length === 0) {
    return <div className="text-center py-4 text-gray-500">No transactions found</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Date</th>
              <th className="py-2 px-4 border-b text-left">Payee</th>
              <th className="py-2 px-4 border-b text-left">Amount</th>
              <th className="py-2 px-4 border-b text-left">Note</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">{transaction.payeeName}</td>
                <td className="py-2 px-4 border-b">₹{transaction.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{transaction.note}</td>
                <td className="py-2 px-4 border-b">
                  <span 
                    className={`px-2 py-1 rounded text-xs font-medium
                      ${transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                        transaction.status === 'failed' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;