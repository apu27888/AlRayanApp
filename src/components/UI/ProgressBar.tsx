import React from 'react';

interface ProgressBarProps {
  progress: number;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color = 'blue', showLabel = false }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    gray: 'bg-gray-500',
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full transition-all duration-300 ${colorClasses[color]}`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm text-gray-600 mt-1">{progress}%</span>
      )}
    </div>
  );
};

export default ProgressBar;