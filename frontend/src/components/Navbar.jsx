import React from 'react';
import { Menu, Moon, Sun, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setSidebarOpen }) => {
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md border-b border-gray-200 dark:border-dark-border">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <button
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        <div className="flex-1"></div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-border rounded-lg transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-dark-border">
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
                {user?.role}
              </span>
            </div>
            
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <User size={16} />
            </div>

            <button
              onClick={handleLogout}
              className="p-2 ml-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
