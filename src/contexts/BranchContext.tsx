import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Branch } from '../types';
import { branches } from '../data/mockData';

interface BranchContextType {
  currentBranch: Branch | null;
  setCurrentBranch: (branch: Branch) => void;
  branches: Branch[];
  isLoading: boolean;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};

interface BranchProviderProps {
  children: ReactNode;
}

export const BranchProvider: React.FC<BranchProviderProps> = ({ children }) => {
  const [currentBranch, setCurrentBranchState] = useState<Branch | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize with the first active branch or default to main garments branch
    const defaultBranch = branches.find(b => b.code === 'ARG') || branches[0];
    if (defaultBranch) {
      setCurrentBranchState(defaultBranch);
    }
    setIsLoading(false);
  }, []);

  const setCurrentBranch = (branch: Branch) => {
    setCurrentBranchState(branch);
    // You can also save to localStorage here for persistence
    localStorage.setItem('selectedBranchId', branch.id);
  };

  const value = {
    currentBranch,
    setCurrentBranch,
    branches,
    isLoading
  };

  return (
    <BranchContext.Provider value={value}>
      {children}
    </BranchContext.Provider>
  );
};