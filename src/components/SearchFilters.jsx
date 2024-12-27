import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const SearchFilters = ({ filters, onFilterChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fileTypes = ['Any', 'PDF', 'DOC', 'PPT', 'XLS', 'TXT', 'ZIP'];
  const timeRanges = ['Any time', 'Past hour', 'Past 24 hours', 'Past week', 'Past month', 'Past year'];
  const languages = [
    { code: 'any', name: 'Any language' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' }
  ];

  const regions = [
    { code: '', name: 'Any region' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'IN', name: 'India' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">File Type</label>
          <select
            value={filters.fileType}
            onChange={(e) => onFilterChange('fileType', e.target.value)}
            className="input py-1"
          >
            {fileTypes.map(type => (
              <option key={type} value={type.toLowerCase()}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Time Range</label>
          <select
            value={filters.timeRange}
            onChange={(e) => onFilterChange('timeRange', e.target.value)}
            className="input py-1"
          >
            {timeRanges.map(range => (
              <option key={range} value={range.toLowerCase()}>{range}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Site/Domain</label>
          <input
            type="text"
            value={filters.site}
            onChange={(e) => onFilterChange('site', e.target.value)}
            placeholder="e.g., example.com"
            className="input py-1"
          />
        </div>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
      >
        <ChevronDownIcon
          className={`w-5 h-5 transform transition-transform ${
            showAdvanced ? 'rotate-180' : ''
          }`}
        />
        {showAdvanced ? 'Less filters' : 'More filters'}
      </button>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Language</label>
            <select
              value={filters.language}
              onChange={(e) => onFilterChange('language', e.target.value)}
              className="input py-1"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Region</label>
            <select
              value={filters.region}
              onChange={(e) => onFilterChange('region', e.target.value)}
              className="input py-1"
            >
              {regions.map(region => (
                <option key={region.code} value={region.code}>{region.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Exact Phrase</label>
            <input
              type="text"
              value={filters.exactPhrase}
              onChange={(e) => onFilterChange('exactPhrase', e.target.value)}
              placeholder='e.g., "exact phrase"'
              className="input py-1"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Exclude Words</label>
            <input
              type="text"
              value={filters.excludeWords}
              onChange={(e) => onFilterChange('excludeWords', e.target.value)}
              placeholder="e.g., word1, word2"
              className="input py-1"
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Numeric Range Field</label>
              <input
                type="text"
                value={filters.numericRange.field}
                onChange={(e) =>
                  onFilterChange('numericRange', {
                    ...filters.numericRange,
                    field: e.target.value,
                  })
                }
                placeholder="e.g., price"
                className="input py-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Min Value</label>
              <input
                type="number"
                value={filters.numericRange.min}
                onChange={(e) =>
                  onFilterChange('numericRange', {
                    ...filters.numericRange,
                    min: e.target.value,
                  })
                }
                placeholder="Minimum"
                className="input py-1"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Max Value</label>
              <input
                type="number"
                value={filters.numericRange.max}
                onChange={(e) =>
                  onFilterChange('numericRange', {
                    ...filters.numericRange,
                    max: e.target.value,
                  })
                }
                placeholder="Maximum"
                className="input py-1"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
