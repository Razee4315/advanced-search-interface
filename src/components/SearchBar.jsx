import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiCommand, FiX } from 'react-icons/fi';
import VoiceSearch from './VoiceSearch';
import toast from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      toast.success('Search initiated!');
    }
  };

  const handleVoiceResult = (transcript) => {
    setQuery(transcript);
    toast.success('Voice input received!');
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
            boxShadow: isFocused
              ? '0 8px 30px rgba(0,0,0,0.12)'
              : '0 2px 8px rgba(0,0,0,0.05)',
          }}
          transition={{ duration: 0.2 }}
          className="relative flex items-center gap-2 bg-white dark:bg-gray-900 rounded-2xl"
        >
          <div className="flex-1 flex items-center">
            <motion.span
              animate={{ opacity: isFocused ? 0.8 : 0.4 }}
              className="pl-4"
            >
              <FiSearch className="w-5 h-5" />
            </motion.span>
            
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your search query..."
              className="w-full px-4 py-4 bg-transparent border-none focus:outline-none 
                       text-gray-800 dark:text-gray-100 placeholder-gray-400"
            />

            <AnimatePresence>
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={clearSearch}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-2"
                >
                  <FiX className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2 pr-4">
            <VoiceSearch onResult={handleVoiceResult} />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-6 py-2.5 bg-blue-500 text-white rounded-xl flex items-center gap-2
                       hover:bg-blue-600 transition-colors duration-200"
            >
              Search
              <span className="text-sm opacity-60 hidden md:inline-flex items-center gap-1">
                <FiCommand className="w-3 h-3" /> Enter
              </span>
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-x-0 top-full mt-2 p-4 bg-white dark:bg-gray-900 
                       rounded-lg shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Tab</kbd> to navigate suggestions</p>
                <p>Press <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">↑</kbd> <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">↓</kbd> to navigate history</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};

export default SearchBar;
