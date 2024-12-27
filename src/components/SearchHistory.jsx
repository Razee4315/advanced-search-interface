import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

const SearchHistory = ({ history, onHistoryItemClick }) => {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
        <ClockIcon className="w-5 h-5" />
        Recent Searches
      </h3>
      <div className="space-y-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onHistoryItemClick(item)}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
