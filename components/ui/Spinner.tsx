import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'border-sui-blue' }) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4 border-2';
      case 'lg':
        return 'h-12 w-12 border-4';
      case 'md':
      default:
        return 'h-8 w-8 border-2';
    }
  };

  return (
    <div className={`animate-spin rounded-full ${getSizeClasses()} border-t-transparent ${color}`}></div>
  );
};

export default Spinner;