import React from 'react';

/**
 * Loading state component displayed during metadata processing
 * 
 * This component provides user feedback during the potentially time-consuming
 * process of parsing metadata from large image files. It includes:
 * - Animated spinner for visual feedback
 * - Clear messaging about the current operation
 * - Additional context about processing time expectations
 */
export const LoadingState: React.FC = () => {
  return (
    <div className="text-center py-12">
      {/* Animated loading spinner */}
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      
      {/* Primary loading message */}
      <p className="text-gray-600 text-lg">Parsing metadata...</p>
      
      {/* Secondary message to set expectations about processing time */}
      <p className="text-gray-500 text-sm mt-2">This may take a moment for large images</p>
    </div>
  );
};