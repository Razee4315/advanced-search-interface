import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar';
import SearchFilters from './components/SearchFilters';
import SearchHistory from './components/SearchHistory';
import SearchSuggestions from './components/SearchSuggestions';
import SearchAnalytics from './components/SearchAnalytics';
import ThemeToggle from './components/ThemeToggle';
import SearchTips from './components/SearchTips';
import KeyboardShortcuts from './components/KeyboardShortcuts';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showTips, setShowTips] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [filters, setFilters] = useState({
    fileType: 'any',
    timeRange: 'any time',
    site: '',
    region: '',
    language: 'any',
    exactPhrase: '',
    excludeWords: '',
    numericRange: { min: '', max: '', field: '' }
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'k':
            e.preventDefault();
            document.querySelector('input[type="text"]')?.focus();
            break;
          case '/':
            e.preventDefault();
            setShowTips(prev => !prev);
            break;
          case 'h':
            e.preventDefault();
            setShowKeyboardShortcuts(prev => !prev);
            break;
          case 'd':
            e.preventDefault();
            setDarkMode(prev => !prev);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const getTimeRangeQuery = (timeRange) => {
    switch (timeRange) {
      case 'past hour':
        return `&tbs=qdr:h`;
      case 'past 24 hours':
        return `&tbs=qdr:d`;
      case 'past week':
        return `&tbs=qdr:w`;
      case 'past month':
        return `&tbs=qdr:m`;
      case 'past year':
        return `&tbs=qdr:y`;
      default:
        return '';
    }
  };

  const handleSearch = (query) => {
    let advancedQuery = query;
    let additionalParams = '';
    
    if (filters.fileType !== 'any') {
      advancedQuery += ` filetype:${filters.fileType}`;
    }
    
    if (filters.site) {
      advancedQuery += ` site:${filters.site}`;
    }

    if (filters.exactPhrase) {
      advancedQuery += ` "${filters.exactPhrase}"`;
    }

    if (filters.excludeWords) {
      const excludedTerms = filters.excludeWords.split(',').map(term => `-${term.trim()}`);
      advancedQuery += ` ${excludedTerms.join(' ')}`;
    }

    if (filters.numericRange.min && filters.numericRange.max && filters.numericRange.field) {
      advancedQuery += ` ${filters.numericRange.field}:${filters.numericRange.min}..${filters.numericRange.max}`;
    }

    additionalParams += getTimeRangeQuery(filters.timeRange);

    if (filters.region) {
      additionalParams += `&cr=country${filters.region}`;
    }
    if (filters.language !== 'any') {
      additionalParams += `&lr=lang_${filters.language}`;
    }

    setSearchHistory(prev => [advancedQuery, ...prev.slice(0, 9)]);

    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(advancedQuery)}${additionalParams}`;
    window.open(searchUrl, '_blank');
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  return (
    <>
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen p-8 bg-gradient-to-br from-gray-50 to-gray-100 
                 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200"
      >
        <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
        
        <main className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-blue-700 
                     text-transparent bg-clip-text"
          >
            Advanced Search Interface
          </motion.h1>
          
          <div className="space-y-6">
            <SearchBar onSearch={handleSearch} />
            <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
            <SearchSuggestions onSuggestionClick={handleSearch} />
            
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowTips(prev => !prev)}
                className="btn btn-primary"
              >
                Search Tips
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowKeyboardShortcuts(prev => !prev)}
                className="btn btn-primary"
              >
                Keyboard Shortcuts
              </motion.button>
            </div>

            <AnimatePresence>
              {showTips && <SearchTips onClose={() => setShowTips(false)} />}
              {showKeyboardShortcuts && (
                <KeyboardShortcuts onClose={() => setShowKeyboardShortcuts(false)} />
              )}
            </AnimatePresence>
            
            {searchHistory.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SearchHistory
                  history={searchHistory}
                  onHistoryItemClick={handleSearch}
                />
                <SearchAnalytics searchHistory={searchHistory} />
              </motion.div>
            )}
          </div>
        </main>
      </motion.div>
    </>
  );
}

export default App;
