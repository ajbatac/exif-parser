import React from 'react';
import { MapPin } from 'lucide-react';

/**
 * Interface defining the structure of location coordinate data
 */
interface LocationCoordinates {
  latitude: number;    // Decimal degrees latitude
  longitude: number;   // Decimal degrees longitude
  formatted: string;   // Human-readable coordinate string (e.g., "40.123456° N, 74.123456° W")
  mapsUrl: string;    // Maps URL for the location
}

interface LocationDisplayProps {
  coordinates: LocationCoordinates;
}

/**
 * Component for displaying location coordinates with enhanced visualization
 * 
 * This component provides a comprehensive display of location data including:
 * - Formatted coordinate display with hemisphere indicators
 * - Clickable link to view location on maps
 * - Embedded map iframe for immediate location visualization
 * - Responsive design that works well within the data display layout
 */
export const LocationDisplay: React.FC<LocationDisplayProps> = ({ coordinates }) => {
  return (
    <div className="space-y-2">
      {/* Coordinate Information Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
        {/* Primary coordinate display with emoji icon */}
        <div className="text-sm font-medium text-gray-700 mb-2">
          📍 {coordinates.formatted}
        </div>
        
        {/* Technical coordinate display for developers/technical users */}
        <div className="text-xs text-gray-500 mb-3">
          Lat: {coordinates.latitude}, Lng: {coordinates.longitude}
        </div>
        
        {/* External link to Google Maps */}
        <a
          href={coordinates.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 transition-colors"
        >
          <MapPin className="w-3 h-3" />
          View on Maps
        </a>
      </div>
      
      {/* Embedded map for immediate location visualization */}
      <div className="mt-4">
        <iframe
          title="Location Map"
          width="100%"
          height="300"
          className="rounded-xl shadow-lg border border-gray-200"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}&z=15&output=embed`}
          allowFullScreen
        />
      </div>
    </div>
  );
};