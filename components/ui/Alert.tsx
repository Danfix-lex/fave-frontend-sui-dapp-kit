import React from 'react';

interface AlertProps {
  message: string;
  type?: 'error' | 'warning' | 'info' | 'success';
}

const Alert: React.FC<AlertProps> = ({ message, type = 'error' }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-900 border-yellow-600 text-yellow-200';
      case 'info':
        return 'bg-blue-900 border-blue-600 text-blue-200';
      case 'success':
        return 'bg-green-900 border-green-600 text-green-200';
      case 'error':
      default:
        return 'bg-red-900 border-red-600 text-red-200';
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'info':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className={`${getTypeStyles()} border px-4 py-3 rounded-lg relative flex items-start`} role="alert">
      <div className="flex-shrink-0 mt-0.5">
        {getTypeIcon()}
      </div>
      <div className="ml-3">
        <span className="block sm:inline">{message}</span>
      </div>
    </div>
  );
};

export default Alert;