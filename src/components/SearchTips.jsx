import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const SearchTips = ({ onClose }) => {
  const tips = [
    {
      title: 'Exact Match',
      description: 'Use quotes for exact phrase matching',
      example: '"exact phrase"'
    },
    {
      title: 'Exclude Terms',
      description: 'Use minus sign to exclude words',
      example: 'search -exclude'
    },
    {
      title: 'Site Search',
      description: 'Search within a specific website',
      example: 'site:example.com'
    },
    {
      title: 'File Type',
      description: 'Search for specific file types',
      example: 'filetype:pdf'
    },
    {
      title: 'Number Range',
      description: 'Search for numbers within a range',
      example: 'camera $100..$500'
    },
    {
      title: 'OR Operator',
      description: 'Search for either term',
      example: 'cats OR dogs'
    },
    {
      title: 'Related Sites',
      description: 'Find similar websites',
      example: 'related:example.com'
    },
    {
      title: 'Cache',
      description: 'View Google\'s cached version',
      example: 'cache:website.com'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Search Tips</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <h3 className="font-bold mb-2">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {tip.description}
                </p>
                <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  {tip.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTips;
