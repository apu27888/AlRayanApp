import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  color?: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newValues);
  };

  const handleRemoveOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selectedValues.filter(v => v !== value));
  };

  const getSelectedOptions = () => {
    return options.filter(option => selectedValues.includes(option.value));
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="w-full p-2 border border-gray-300 rounded-md bg-white cursor-pointer focus:ring-blue-500 focus:border-blue-500 min-h-[40px] flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 flex-1">
          {selectedValues.length === 0 ? (
            <span className="text-gray-500 text-sm">{placeholder}</span>
          ) : (
            getSelectedOptions().map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs"
              >
                {option.color && (
                  <div
                    className="w-3 h-3 rounded border"
                    style={{ backgroundColor: option.color }}
                  />
                )}
                <span>{option.label}</span>
                <button
                  onClick={(e) => handleRemoveOption(option.value, e)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedValues.includes(option.value) ? 'bg-blue-50' : ''
              }`}
              onClick={() => handleToggleOption(option.value)}
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => {}} // Handled by parent onClick
                className="rounded"
              />
              {option.color && (
                <div
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: option.color }}
                />
              )}
              <span className="text-sm">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;