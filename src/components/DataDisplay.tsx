import React from 'react';
import { MapPin, Calendar, Camera, Settings, Copyright, Hash } from 'lucide-react';
import { LocationDisplay } from './LocationDisplay';

// Type definitions for component props
interface CleanedData {
  [key: string]: any;
}

interface DataDisplayProps {
  cleanedData: CleanedData;
  rawData: any;
}

/**
 * Component for displaying metadata in two columns: cleaned data and raw JSON
 * 
 * This component provides a comprehensive view of image metadata by:
 * - Displaying cleaned, formatted data with appropriate icons
 * - Showing raw JSON data for technical users
 * - Handling special cases like GPS coordinates with enhanced display
 * - Organizing data with visual hierarchy and scrollable containers
 */
export const DataDisplay: React.FC<DataDisplayProps> = ({ cleanedData, rawData }) => {
  /**
   * Categorizes metadata fields into logical groups for navigation
   * 
   * @param key - The metadata field key
   * @returns The category name for the field
   */
  const getCategoryForField = (key: string): string => {
    const lowerKey = key.toLowerCase();
    
    if (lowerKey.includes('copyright') || lowerKey.includes('artist') || lowerKey.includes('author') ||
        lowerKey.includes('creator') || lowerKey.includes('rights')) {
      return 'copyright';
    }
    if (lowerKey.includes('serial') || lowerKey.includes('body') || lowerKey.includes('lens') && 
        (lowerKey.includes('serial') || lowerKey.includes('number'))) {
      return 'serial';
    }
    if (lowerKey.includes('gps') || lowerKey.includes('location')) {
      return 'location';
    }
    if (lowerKey.includes('date') || lowerKey.includes('time')) {
      return 'datetime';
    }
    if (lowerKey.includes('camera') || lowerKey.includes('make') || lowerKey.includes('model') || 
        lowerKey.includes('lens') || lowerKey.includes('focal')) {
      return 'camera';
    }
    if (lowerKey.includes('iso') || lowerKey.includes('aperture') || lowerKey.includes('exposure') ||
        lowerKey.includes('shutter') || lowerKey.includes('flash') || lowerKey.includes('white')) {
      return 'settings';
    }
    return 'other';
  };

  /**
   * Groups metadata fields by category for organized display
   */
  const groupedData = Object.entries(cleanedData).reduce((acc, [key, value]) => {
    const category = getCategoryForField(key);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push([key, value]);
    return acc;
  }, {} as Record<string, Array<[string, any]>>);

  /**
   * Configuration for category display with icons and labels
   */
  const categoryConfig = {
    copyright: { label: 'Copyright & Rights', icon: Copyright, color: 'red' },
    serial: { label: 'Serial Numbers', icon: Hash, color: 'indigo' },
    location: { label: 'Location & GPS', icon: MapPin, color: 'blue' },
    datetime: { label: 'Date & Time', icon: Calendar, color: 'green' },
    camera: { label: 'Camera & Lens', icon: Camera, color: 'purple' },
    settings: { label: 'Camera Settings', icon: Settings, color: 'orange' },
    other: { label: 'Other Metadata', icon: Settings, color: 'gray' }
  };

  /**
   * Smoothly scrolls to a specific metadata category section
   * 
   * @param categoryId - The category ID to scroll to
   */
  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  /**
   * Returns an appropriate icon for a given metadata field based on its key name
   * 
   * This function categorizes metadata fields and assigns relevant icons to improve
   * the visual organization and quick identification of different data types.
   * 
   * @param key - The metadata field key/name
   * @returns JSX element containing the appropriate Lucide icon
   */
  const getIconForField = (key: string) => {
    const lowerKey = key.toLowerCase();
    
    // Copyright and rights-related fields
    if (lowerKey.includes('copyright') || lowerKey.includes('artist') || lowerKey.includes('author') ||
        lowerKey.includes('creator') || lowerKey.includes('rights')) {
      return <Copyright className="w-4 h-4 text-red-500" />;
    }
    
    // Serial number and identification fields
    if (lowerKey.includes('serial') || (lowerKey.includes('body') && lowerKey.includes('serial')) ||
        (lowerKey.includes('lens') && lowerKey.includes('serial'))) {
      return <Hash className="w-4 h-4 text-indigo-500" />;
    }
    
    // GPS and location-related fields
    if (lowerKey.includes('gps') || lowerKey.includes('location')) {
      return <MapPin className="w-4 h-4 text-blue-500" />;
    }
    
    // Date and time-related fields
    if (lowerKey.includes('date') || lowerKey.includes('time')) {
      return <Calendar className="w-4 h-4 text-green-500" />;
    }
    
    // Camera and device-related fields
    if (lowerKey.includes('camera') || lowerKey.includes('make') || lowerKey.includes('model')) {
      return <Camera className="w-4 h-4 text-purple-500" />;
    }
    
    // Default icon for other technical settings
    return <Settings className="w-4 h-4 text-gray-500" />;
  };

  /**
   * Renders metadata field values with appropriate formatting
   * 
   * This function handles different data types and provides special rendering
   * for complex objects like GPS coordinates and special fields like copyright. It ensures that all data is
   * displayed in a readable and useful format.
   * 
   * @param key - The metadata field key
   * @param value - The metadata field value
   * @returns JSX element with formatted value display
   */
  const renderValue = (key: string, value: any) => {
    // Special handling for GPS coordinates with enhanced display
    if (key === 'GPSCoordinates' && typeof value === 'object') {
      return <LocationDisplay coordinates={value} />;
    }
    
    // Special handling for copyright information with enhanced display
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('copyright') || lowerKey.includes('artist') || lowerKey.includes('author') ||
        lowerKey.includes('creator') || lowerKey.includes('rights')) {
      return (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <Copyright className="w-4 h-4 text-red-600" />
            <span className="font-medium text-red-800">Copyright Information</span>
          </div>
          <div className="text-sm text-red-700">{String(value)}</div>
          <div className="text-xs text-red-600 mt-2">
            ⚠️ This content may be protected by copyright
          </div>
        </div>
      );
    }
    
    // Special handling for serial numbers with enhanced display
    if (lowerKey.includes('serial') || (lowerKey.includes('body') && lowerKey.includes('serial')) ||
        (lowerKey.includes('lens') && lowerKey.includes('serial'))) {
      return (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-3 rounded-lg border border-indigo-100">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-4 h-4 text-indigo-600" />
            <span className="font-medium text-indigo-800">Serial Number</span>
          </div>
          <div className="font-mono text-sm text-indigo-700 bg-white px-2 py-1 rounded border">
            {String(value)}
          </div>
          <div className="text-xs text-indigo-600 mt-2">
            🔍 Unique device identifier
          </div>
        </div>
      );
    }
    
    // Format complex objects as readable JSON
    if (typeof value === 'object') {
      return (
        <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto border">
          {JSON.stringify(value, null, 2)}
        </pre>
      );
    }
    
    // Display simple values as strings
    return <span className="text-gray-800">{String(value)}</span>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Cleaned Data Column */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden" id="cleaned-data">
        {/* Header with gradient background and descriptive text */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">📊 Cleaned Data</h2>
          <p className="text-purple-100 text-sm">Processed and formatted metadata</p>
        </div>
        
        {/* Internal Navigation Menu */}
        {Object.keys(groupedData).length > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Navigation</h3>
            <div className="flex flex-wrap gap-2">
              {Object.entries(groupedData).map(([category, fields]) => {
                const config = categoryConfig[category as keyof typeof categoryConfig];
                const IconComponent = config.icon;
                return (
                  <button
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full transition-colors
                      bg-${config.color}-50 text-${config.color}-700 hover:bg-${config.color}-100`}
                  >
                    <IconComponent className="w-3 h-3" />
                    {config.label} ({fields.length})
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {/* Scrollable content area with organized field display */}
        <div className="p-6 max-h-[600px] overflow-y-auto">
          <div className="space-y-8">
            {Object.entries(groupedData).map(([category, fields]) => {
              const config = categoryConfig[category as keyof typeof categoryConfig];
              const IconComponent = config.icon;
              
              return (
                <div key={category} id={`category-${category}`} className="scroll-mt-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                    <IconComponent className={`w-5 h-5 text-${config.color}-500`} />
                    <h3 className="text-lg font-semibold text-gray-900">{config.label}</h3>
                    <span className="text-sm text-gray-500">({fields.length})</span>
                  </div>
                  
                  {/* Category Fields */}
                  <div className="space-y-4 ml-2">
                    {fields.map(([key, value]) => (
                      <div key={key} className="border-b border-gray-50 pb-3 last:border-b-0">
                        {/* Field header with icon and name */}
                        <div className="flex items-center gap-2 mb-2">
                          {getIconForField(key)}
                          <span className="font-medium text-gray-800">{key}</span>
                        </div>
                        
                        {/* Field value with appropriate indentation */}
                        <div className="ml-6">
                          {renderValue(key, value)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Raw JSON Column */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden" id="raw-data">
        {/* Header with different gradient to distinguish from cleaned data */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 px-6 py-4">
          <h2 className="text-xl font-bold text-white">🔧 Raw JSON</h2>
          <p className="text-gray-100 text-sm">Complete EXIF data structure</p>
        </div>
        
        {/* Scrollable JSON display with syntax highlighting via background */}
        <div className="p-6 max-h-[600px] overflow-y-auto">
          <pre className="text-xs text-gray-800 whitespace-pre-wrap break-words bg-gray-50 p-4 rounded-lg border">
            {JSON.stringify(rawData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};