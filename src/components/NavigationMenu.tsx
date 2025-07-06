import React from 'react';
import { Upload, Image, Database, FileText, Plus } from 'lucide-react';

/**
 * Props interface for the NavigationMenu component
 */
interface NavigationMenuProps {
  hasData: boolean;   // Whether metadata has been successfully parsed
  hasImage: boolean;  // Whether an image has been uploaded and is ready for preview
  onUploadClick: () => void; // Callback to show upload section
}

/**
 * Navigation menu component for smooth scrolling between page sections
 * 
 * This component provides:
 * - Quick navigation to different sections of the application
 * - Conditional rendering based on available content
 * - Smooth scrolling behavior for better user experience
 * - Visual consistency with color-coded section buttons
 * - Responsive design that works on all screen sizes
 */
export const NavigationMenu: React.FC<NavigationMenuProps> = ({ hasData, hasImage, onUploadClick }) => {
  /**
   * Smoothly scrolls to a specific section of the page
   * 
   * This function provides enhanced navigation by smoothly scrolling to
   * the target section instead of jumping immediately. This creates a
   * more polished user experience.
   * 
   * @param sectionId - The ID of the target section element
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      {/* Navigation menu title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Navigation</h3>
      
      {/* Navigation buttons with responsive flex layout */}
      <div className="flex flex-wrap gap-3">
        {/* Upload new file button - always available when data exists */}
        <button
          onClick={onUploadClick}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Upload New File
        </button>
        
        {/* Image preview button - only shown when an image is available */}
        {hasImage && (
          <button
            onClick={() => scrollToSection('preview')}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Image className="w-4 h-4" />
            Preview
          </button>
        )}
        
        {/* Data section buttons - only shown when EXIF data is available */}
        {hasData && (
          <>
            {/* Cleaned data section button */}
            <button
              onClick={() => scrollToSection('cleaned-data')}
              className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <Database className="w-4 h-4" />
              Cleaned Data
            </button>
            
            {/* Raw JSON section button */}
            <button
              onClick={() => scrollToSection('raw-data')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FileText className="w-4 h-4" />
              Raw JSON
            </button>
          </>
        )}
      </div>
    </div>
  );
};