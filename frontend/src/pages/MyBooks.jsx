import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Loader2, BookOpen, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const MyBooks = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transactions/my');
      setTransactions(data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to fetch transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (transactionId) => {
    try {
      const { data } = await api.post('/transactions/return', { transactionId });
      toast.success(data.fine > 0 ? `Book returned. Fine: ₹${data.fine}` : 'Book returned successfully!');
      fetchTransactions();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to return book');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Books</h1>

      {loading ? (
        <div className="flex justify-center h-64 items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-dark-border/50 border-b border-gray-100 dark:border-dark-border border-t-0">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Book</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Issue Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Due Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                {transactions.length > 0 ? transactions.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-50/50 dark:hover:bg-dark-border/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-12 bg-gray-200 dark:bg-gray-700 rounded mr-3 overflow-hidden">
                          <img src={t.bookId?.coverImage || 'https://placehold.co/150x150'} alt="Cover" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{t.bookId?.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{t.bookId?.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                      {new Date(t.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      {new Date(t.dueDate).toLocaleDateString()}
                      {new Date(t.dueDate) < new Date() && t.status === 'Active' && (
                        <AlertCircle className="w-4 h-4 text-red-500 ml-2" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        t.status === 'Returned' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : (new Date(t.dueDate) < new Date() ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400')
                      }`}>
                        {t.status === 'Active' && new Date(t.dueDate) < new Date() ? 'Overdue' : t.status}
                      </span>
                      {t.fine > 0 && (
                        <div className="mt-1 text-xs text-red-500 font-medium whitespace-nowrap">Fine: ₹{t.fine}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {t.status === 'Active' ? (
                        <button
                          onClick={() => handleReturn(t._id)}
                          className="px-3 py-1.5 text-sm bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 font-medium rounded-lg transition-colors"
                        >
                          Return Book
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">--</span>
                      )}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      <BookOpen size={32} className="mx-auto mb-3 opacity-50" />
                      <p>You haven't issued any books yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
