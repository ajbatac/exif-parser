import React from 'react';
import { Image } from 'lucide-react';

/**
 * Props interface for the ImagePreview component
 */
interface ImagePreviewProps {
  imageUrl: string;  // Object URL for the uploaded image
  fileName: string;  // Name of the uploaded file
}

/**
 * Component for displaying a preview of the uploaded image
 * 
 * This component provides:
 * - Responsive image display with size constraints
 * - Proper aspect ratio maintenance
 * - File name display in the header
 * - Consistent styling with other application components
 * - Optimized image rendering with object-contain
 */
export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, fileName }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8" id="preview">
      {/* Header section with gradient background */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
        <div className="flex items-center gap-2">
          {/* Image icon for visual consistency */}
          <Image className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Image Preview</h2>
        </div>
        
        {/* Display the uploaded file name */}
        <p className="text-green-100 text-sm">{fileName}</p>
      </div>
      
      {/* Image display area */}
      <div className="p-6">
        <div className="flex justify-center">
          <img
            src={imageUrl}
            alt={fileName}
            className="max-w-full max-h-96 rounded-xl shadow-lg object-contain"
            // object-contain ensures the entire image is visible while maintaining aspect ratio
            // max-h-96 limits the height to prevent extremely tall images from dominating the page
            // max-w-full ensures the image doesn't overflow its container on smaller screens
          />
        </div>
      </div>
    </div>
  );
};