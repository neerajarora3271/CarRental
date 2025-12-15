import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
    
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>

      <p className="mt-4 text-lg text-gray-600 font-medium">Loading...</p>
    </div>
  );
};

export default Loading;
