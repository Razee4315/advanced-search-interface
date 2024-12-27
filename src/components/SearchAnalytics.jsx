import React from 'react';
import { motion } from 'framer-motion';
import { FiBarChart2, FiPieChart, FiActivity } from 'react-icons/fi';

const SearchAnalytics = ({ searchHistory }) => {
  // Calculate some mock analytics
  const totalSearches = searchHistory.length;
  const uniqueSearches = new Set(searchHistory).size;
  const avgSearchLength = searchHistory.reduce((acc, curr) => acc + curr.length, 0) / totalSearches || 0;

  const stats = [
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      label: 'Total Searches',
      value: totalSearches,
      color: 'bg-blue-500',
    },
    {
      icon: <FiPieChart className="w-6 h-6" />,
      label: 'Unique Searches',
      value: uniqueSearches,
      color: 'bg-green-500',
    },
    {
      icon: <FiActivity className="w-6 h-6" />,
      label: 'Avg. Length',
      value: Math.round(avgSearchLength),
      color: 'bg-purple-500',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-neu-light dark:shadow-neu-dark"
    >
      <h2 className="text-xl font-bold mb-6">Search Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
            <motion.div
              className={`absolute inset-0 ${stat.color} opacity-10`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          </motion.div>
        ))}
      </div>

      {searchHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h3 className="text-lg font-semibold mb-4">Search Patterns</h3>
          <div className="h-24 relative">
            {searchHistory.slice(-10).map((_, index) => (
              <motion.div
                key={index}
                className="absolute bottom-0"
                style={{ left: `${index * 10}%`, height: `${Math.random() * 100}%`, width: '8%' }}
                initial={{ height: 0 }}
                animate={{ height: `${Math.random() * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div className="w-full h-full bg-primary-500 opacity-75 rounded-t-lg" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchAnalytics;
