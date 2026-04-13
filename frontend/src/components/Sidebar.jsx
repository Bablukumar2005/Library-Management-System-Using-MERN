import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Library, History, Users, X, LibraryBig } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();

  const navLinks = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Books', icon: BookOpen, path: '/books' },
    { name: 'My Books', icon: Library, path: '/my-books' },
  ];

  if (user?.role === 'admin') {
    navLinks.push(
      { name: 'Manage Books', icon: LibraryBig, path: '/admin/books' },
      { name: 'All Transactions', icon: History, path: '/admin/transactions' }
    );
  }

  return (
    <>
      {/* Mobile background */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            <BookOpen className="text-blue-600" />
            LMS
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-border'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
