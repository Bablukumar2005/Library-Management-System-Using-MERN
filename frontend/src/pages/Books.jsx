import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Search, Filter, Loader2, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchBooks();
  }, [search]);

  const fetchBooks = async () => {
    try {
      const { data } = await api.get(`/books${search ? `?keyword=${search}` : ''}`);
      setBooks(data);
    } catch (error) {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleIssue = async (bookId) => {
    try {
      await api.post('/transactions/issue', { bookId });
      toast.success('Book issued successfully!');
      fetchBooks(); // Refresh list to update available copies
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to issue book');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Library Catalogue</h1>
        
        <div className="flex w-full sm:w-auto relative group">
          <input
            type="text"
            placeholder="Search books..."
            className="input pl-10 pr-4 w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {books.length > 0 ? books.map((book, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={book._id}
              className="card overflow-hidden group flex flex-col"
            >
              <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {book.availableCopies === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold tracking-wider px-4 py-2 bg-red-600/90 rounded-lg drop-shadow-md backdrop-blur-sm transform -rotate-12">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="bg-white/90 dark:bg-dark-bg/90 backdrop-blur text-xs font-semibold px-2 py-1 rounded-md shadow-sm">
                    {book.category}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{book.author}</p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className={`px-2 py-1 rounded-full font-medium ${
                    book.availableCopies > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {book.availableCopies} available
                  </span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-border">
                  <button
                    onClick={() => handleIssue(book._id)}
                    disabled={book.availableCopies === 0}
                    className="w-full btn-primary py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <BookOpen size={16} className="mr-2" />
                    Issue Book
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full flex flex-col items-center justify-center h-64 text-gray-500">
              <BookOpen size={48} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;
