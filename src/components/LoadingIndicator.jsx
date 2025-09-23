import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      <span className="ml-3 text-gray-600">Verifying medication...</span>
    </div>
  );
};

export default LoadingIndicator;