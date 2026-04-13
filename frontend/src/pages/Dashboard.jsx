import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, Users, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className="card p-6 flex items-center bg-white dark:bg-dark-card hover:shadow-md transition-shadow"
  >
    <div className={`p-4 rounded-full ${color} mr-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name.split(' ')[0]}!
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Books" value="1,248" icon={BookOpen} color="bg-blue-500" delay={0.1} />
        <StatCard title="Active Users" value="452" icon={Users} color="bg-indigo-500" delay={0.2} />
        <StatCard title="Books Issued" value="84" icon={Clock} color="bg-purple-500" delay={0.3} />
        <StatCard title="Overdue Books" value="12" icon={AlertCircle} color="bg-red-500" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col sm:flex-row items-center sm:justify-between py-3 border-b border-gray-100 dark:border-dark-border last:border-0 gap-2">
                <div className="flex w-full items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">The Great Gatsby</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Issued by Jane Doe</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Issued Books</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-dark-border gap-2">
                <div className="flex items-center">
                  <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded mr-3 overflow-hidden shadow">
                    <img src="https://via.placeholder.com/150" alt="Cover" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Clean Code</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Robert C. Martin</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full dark:bg-orange-900/30 dark:text-orange-400 whitespace-nowrap">
                    Due in 2 days
                  </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
