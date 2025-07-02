import React from 'react';
import { Building, MapPin } from 'lucide-react';
import { useBranch } from '../../contexts/BranchContext';

interface BranchIndicatorProps {
  showLocation?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const BranchIndicator: React.FC<BranchIndicatorProps> = ({ 
  showLocation = true, 
  size = 'md',
  className = ''
}) => {
  const { currentBranch } = useBranch();

  if (!currentBranch) {
    return null;
  }

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  const getBranchTypeColor = (type: string) => {
    return type === 'main' ? 'text-blue-600' : 'text-green-600';
  };

  return (
    <div className={`flex items-center space-x-2 ${sizeClasses[size]} ${className}`}>
      <Building className={getBranchTypeColor(currentBranch.type)} size={iconSizes[size]} />
      <span className="font-medium text-gray-700">{currentBranch.name}</span>
      {showLocation && (
        <>
          <span className="text-gray-400">•</span>
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin size={iconSizes[size] - 2} />
            <span>{currentBranch.location}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default BranchIndicator;