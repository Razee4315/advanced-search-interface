import React from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiClock, FiStar } from 'react-icons/fi';

const SearchSuggestions = ({ onSuggestionClick }) => {
  const trendingSearches = [
    { id: 1, text: 'AI and Machine Learning', icon: <FiTrendingUp /> },
    { id: 2, text: 'Web Development 2024', icon: <FiTrendingUp /> },
    { id: 3, text: 'Data Science Tutorials', icon: <FiTrendingUp /> },
  ];

  const recentSearches = [
    { id: 1, text: 'JavaScript Frameworks', icon: <FiClock /> },
    { id: 2, text: 'React Best Practices', icon: <FiClock /> },
    { id: 3, text: 'Python Programming', icon: <FiClock /> },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiTrendingUp className="text-blue-500" />
          Trending Searches
        </h3>
        {trendingSearches.map((search) => (
          <motion.button
            key={search.id}
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick(search.text)}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 
                     shadow-sm hover:shadow-md dark:shadow-neu-dark transition-all duration-200
                     text-left text-gray-700 dark:text-gray-300"
          >
            <span className="text-blue-500">{search.icon}</span>
            {search.text}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiClock className="text-blue-500" />
          Recent Searches
        </h3>
        {recentSearches.map((search) => (
          <motion.button
            key={search.id}
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick(search.text)}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 
                     shadow-sm hover:shadow-md dark:shadow-neu-dark transition-all duration-200
                     text-left text-gray-700 dark:text-gray-300"
          >
            <span className="text-blue-500">{search.icon}</span>
            {search.text}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default SearchSuggestions;
