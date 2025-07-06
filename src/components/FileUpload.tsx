import React from 'react';
import { Upload, Image, X } from 'lucide-react';

/**
 * Props interface for the FileUpload component
 */
interface FileUploadProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
  isLoading: boolean;
  onClear: () => void;
}

/**
 * File upload component with drag-and-drop styling and file management
 * 
 * This component provides:
 * - Visual drag-and-drop upload area with hover effects
 * - File type restrictions (images only)
 * - Current file display with clear functionality
 * - Loading state handling to prevent multiple uploads
 * - Accessible design with proper labeling
 */
export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  fileName,
  isLoading,
  onClear
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8" id="upload">
      <div className="flex flex-col items-center">
        {/* Main upload area with drag-and-drop styling */}
        <div className="w-full max-w-md">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {/* Upload icon */}
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
              
              {/* Primary instruction text */}
              <p className="mb-2 text-lg font-medium text-gray-700">
                Drop your image here or click to upload
              </p>
              
              {/* Secondary instruction text with supported formats */}
              <p className="text-sm text-gray-500">
                Supports JPEG, TIFF, and other image formats
              </p>
            </div>
            
            {/* Hidden file input with proper restrictions */}
            <input
              type="file"
              className="hidden"
              accept="image/*" // Restrict to image files only
              onChange={onFileUpload}
              disabled={isLoading} // Prevent uploads during processing
            />
          </label>
        </div>
        
        {/* Current file display - only shown when a file is selected */}
        {fileName && (
          <div className="flex items-center gap-2 mt-4 px-4 py-2 bg-blue-50 rounded-lg">
            {/* File icon */}
            <Image className="w-4 h-4 text-blue-600" />
            
            {/* File name display */}
            <span className="text-blue-800 font-medium">{fileName}</span>
            
            {/* Clear button to remove current file */}
            <button
              onClick={onClear}
              className="p-1 hover:bg-blue-100 rounded-full transition-colors"
              aria-label="Clear selected file"
            >
              <X className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};