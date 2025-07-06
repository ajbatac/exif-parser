import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * Props interface for the ErrorState component
 */
interface ErrorStateProps {
  error: string; // Error message to display to the user
}

/**
 * Error state component for displaying user-friendly error messages
 * 
 * This component provides:
 * - Clear visual indication of an error state with appropriate colors
 * - Icon-based visual hierarchy for quick recognition
 * - Accessible error message display
 * - Consistent styling with application design system
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3">
        {/* Error icon for immediate visual recognition */}
        <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
        
        <div>
          {/* Error title */}
          <h3 className="text-red-800 font-semibold">Error Processing Image</h3>
          
          {/* Detailed error message */}
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      </div>
    </div>
  );
};