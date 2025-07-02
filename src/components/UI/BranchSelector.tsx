import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Building, Check, MapPin, Phone, Mail } from 'lucide-react';
import { useBranch } from '../../contexts/BranchContext';
import { Branch } from '../../types';

const BranchSelector: React.FC = () => {
  const { currentBranch, setCurrentBranch, branches } = useBranch();
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

  const handleBranchSelect = (branch: Branch) => {
    setCurrentBranch(branch);
    setIsOpen(false);
  };

  const getBranchTypeColor = (type: string) => {
    return type === 'main' ? 'text-blue-600' : 'text-green-600';
  };

  const getBranchTypeBadge = (type: string) => {
    return type === 'main' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  if (!currentBranch) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-w-[280px]"
      >
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-lg ${
            currentBranch.type === 'main' ? 'bg-blue-100' : 'bg-green-100'
          }`}>
            <Building className={getBranchTypeColor(currentBranch.type)} size={16} />
          </div>
          <div className="text-left">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 text-sm">{currentBranch.name}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBranchTypeBadge(currentBranch.type)}`}>
                {currentBranch.type}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MapPin size={10} />
              <span>{currentBranch.location}</span>
            </div>
          </div>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">Select Branch</h3>
            <p className="text-xs text-gray-500">Choose which branch you want to work with</p>
          </div>
          
          <div className="py-2">
            {branches.filter(branch => branch.isActive).map((branch) => (
              <button
                key={branch.id}
                onClick={() => handleBranchSelect(branch)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                  currentBranch.id === branch.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      branch.type === 'main' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      <Building className={getBranchTypeColor(branch.type)} size={16} />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900 text-sm">{branch.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBranchTypeBadge(branch.type)}`}>
                          {branch.type}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <MapPin size={10} />
                          <span>{branch.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Phone size={10} />
                          <span>{branch.phone}</span>
                        </div>
                      </div>
                      {branch.description && (
                        <p className="text-xs text-gray-400 mt-1 max-w-xs">{branch.description}</p>
                      )}
                    </div>
                  </div>
                  {currentBranch.id === branch.id && (
                    <Check className="text-blue-600" size={16} />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-100 bg-gray-50">
            <div className="text-xs text-gray-500">
              <p className="font-medium mb-1">Current Branch Contact:</p>
              <div className="flex items-center space-x-1 mb-1">
                <Phone size={10} />
                <span>{currentBranch.phone}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail size={10} />
                <span>{currentBranch.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchSelector;