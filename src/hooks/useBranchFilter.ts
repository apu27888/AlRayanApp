import { useMemo } from 'react';
import { useBranch } from '../contexts/BranchContext';

/**
 * Custom hook to filter data based on the currently selected branch
 * @param data - Array of data items that have a branchId property
 * @param showAllBranches - Optional flag to show all data regardless of branch
 * @returns Filtered data array
 */
export const useBranchFilter = <T extends { branchId?: string }>(
  data: T[], 
  showAllBranches: boolean = false
): T[] => {
  const { currentBranch } = useBranch();

  return useMemo(() => {
    if (showAllBranches || !currentBranch) {
      return data;
    }

    return data.filter(item => {
      // If item doesn't have branchId, include it (for backward compatibility)
      if (!item.branchId) {
        return true;
      }
      
      // Filter by current branch
      return item.branchId === currentBranch.id;
    });
  }, [data, currentBranch, showAllBranches]);
};

/**
 * Hook to get branch-specific statistics
 */
export const useBranchStats = () => {
  const { currentBranch, branches } = useBranch();

  return useMemo(() => {
    return {
      currentBranch,
      totalBranches: branches.length,
      activeBranches: branches.filter(b => b.isActive).length,
      mainBranches: branches.filter(b => b.type === 'main').length,
      subsidiaryBranches: branches.filter(b => b.type === 'subsidiary').length
    };
  }, [currentBranch, branches]);
};