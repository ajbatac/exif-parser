import React, { useState, useCallback } from 'react';
import { Image } from 'lucide-react';
import { MetadataService, MetadataData, CleanedData } from './services/MetadataService';
import { FileUpload } from './components/FileUpload';
import { ImagePreview } from './components/ImagePreview';
import { NavigationMenu } from './components/NavigationMenu';
import { DataDisplay } from './components/DataDisplay';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';

/**
 * Main application component for the Image Metadata Parser tool
 * 
 * This component manages the entire application state and orchestrates
 * the flow from file upload to metadata display. It handles:
 * - File upload and validation
 * - Metadata parsing and processing
 * - Error handling and loading states
 * - Image preview and metadata display
 */
function App() {
  // State management for metadata and application flow
  const [metadataData, setMetadataData] = useState<MetadataData | null>(null); // Raw metadata from the image
  const [cleanedData, setCleanedData] = useState<CleanedData | null>(null); // Processed and formatted metadata
  const [fileName, setFileName] = useState<string>(''); // Name of the uploaded file
  const [imageUrl, setImageUrl] = useState<string>(''); // Object URL for image preview
  const [isLoading, setIsLoading] = useState(false); // Loading state during metadata parsing
  const [error, setError] = useState<string>(''); // Error message for display
  const [showUploader, setShowUploader] = useState(true); // Controls uploader visibility

  /**
   * Handles file upload and metadata extraction
   * 
   * This function:
   * 1. Validates the uploaded file
   * 2. Creates an object URL for image preview
   * 3. Parses metadata using MetadataService
   * 4. Updates application state with results or errors
   * 
   * @param event - File input change event
   */
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset previous state and start loading
    setIsLoading(true);
    setError('');
    setFileName(file.name);

    // Create object URL for image preview
    // This allows us to display the image without uploading it to a server
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    try {
      // Parse metadata from the uploaded file
      const { rawData, cleanedData } = await MetadataService.parseMetadata(file);
      setMetadataData(rawData);
      setCleanedData(cleanedData);
      setShowUploader(false); // Hide uploader after successful analysis
    } catch (err) {
      // Handle parsing errors gracefully
      setError('Failed to parse metadata. Please ensure the file is a valid image with metadata.');
      console.error('Metadata parsing error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clears all application state and revokes object URLs
   * 
   * This function resets the application to its initial state
   * and properly cleans up memory by revoking object URLs
   */
  const clearData = useCallback(() => {
    setMetadataData(null);
    setCleanedData(null);
    setFileName('');
    setError('');
    setShowUploader(true); // Show uploader when clearing data
    
    // Clean up object URL to prevent memory leaks
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl('');
    }
  }, [imageUrl]);

  /**
   * Shows the uploader section for uploading a new file
   */
  const handleShowUploader = useCallback(() => {
    setShowUploader(true);
    // Scroll to upload section after showing it
    setTimeout(() => {
      const element = document.getElementById('upload');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  // Computed values for conditional rendering
  const hasData = metadataData && cleanedData; // Both raw and cleaned data are available
  const hasImage = imageUrl && fileName; // Image is uploaded and ready for preview

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Application Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* Logo with gradient background */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Image className="w-10 h-10 text-white" />
              </div>
              {/* Main title with gradient text effect */}
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Metadata Parser
              </h1>
            </div>
            {/* Subtitle describing the application's purpose */}
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Extract and analyze metadata from your images with advanced GPS coordinate processing and beautiful visualization
            </p>
          </div>

          {/* Navigation Menu - Only shown when there's data or an image to navigate to */}
          {(hasData || hasImage) && (
            <NavigationMenu 
              hasData={!!hasData} 
              hasImage={!!hasImage} 
              onUploadClick={handleShowUploader}
            />
          )}

          {/* File Upload Section - Conditionally visible */}
          {showUploader && (
            <FileUpload
              onFileUpload={handleFileUpload}
              fileName={fileName}
              isLoading={isLoading}
              onClear={clearData}
            />
          )}

          {/* Loading State - Shown during EXIF data processing */}
          {isLoading && <LoadingState />}

          {/* Error State - Shown when EXIF parsing fails */}
          {error && <ErrorState error={error} />}

          {/* Image Preview - Shown when an image is successfully uploaded */}
          {hasImage && (
            <ImagePreview imageUrl={imageUrl} fileName={fileName} />
          )}

          {/* EXIF Data Display - Shown when data is successfully parsed */}
          {hasData && (
            <DataDisplay cleanedData={cleanedData} rawData={metadataData} />
          )}

          {/* Application Footer */}
          <div className="text-center mt-16 py-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Built with modern web technologies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;