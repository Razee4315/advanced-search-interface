import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const KeyboardShortcuts = ({ onClose }) => {
  const shortcuts = [
    {
      key: 'Ctrl/⌘ + K',
      description: 'Focus search bar'
    },
    {
      key: 'Ctrl/⌘ + /',
      description: 'Toggle search tips'
    },
    {
      key: 'Ctrl/⌘ + H',
      description: 'Toggle keyboard shortcuts'
    },
    {
      key: 'Ctrl/⌘ + D',
      description: 'Toggle dark mode'
    },
    {
      key: 'Esc',
      description: 'Close modal'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
              >
                <span className="font-mono bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                  {shortcut.key}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {shortcut.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
