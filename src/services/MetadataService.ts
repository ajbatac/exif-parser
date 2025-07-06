import MetadataReader from 'exifreader';

// Type definitions for metadata structures
export interface MetadataData {
  [key: string]: any;
}

export interface CleanedData {
  [key: string]: any;
}

/**
 * Interface for location coordinate data with multiple representations
 */
export interface LocationCoordinates {
  latitude: number;      // Decimal degrees latitude
  longitude: number;     // Decimal degrees longitude
  formatted: string;     // Human-readable coordinate string
  mapsUrl: string;      // Maps URL for the location
}

/**
 * Service class for handling metadata extraction and processing
 * 
 * This service provides methods to:
 * - Parse metadata from image files
 * - Convert GPS coordinates from DMS to decimal format
 * - Clean and format metadata for display
 * - Handle various edge cases in GPS coordinate processing
 */
export class MetadataService {
  /**
   * Safely divides two numbers, returning 0 if denominator is 0
   * 
   * This prevents division by zero errors that can occur in metadata
   * where some values might be malformed or missing
   * 
   * @param param0 - Array containing [numerator, denominator]
   * @returns The division result or 0 if denominator is 0
   */
  private static safeDivide = ([num, denom]: number[]): number =>
    denom === 0 ? 0 : num / denom;

  /**
   * Converts location coordinates from Degrees, Minutes, Seconds (DMS) format to decimal degrees
   * 
   * Location data is typically stored in DMS format as arrays of fractions.
   * This method converts that format to decimal degrees for easier use in mapping APIs.
   * 
   * Formula: decimal = degrees + (minutes/60) + (seconds/3600)
   * 
   * @param dmsArray - Array of [degrees, minutes, seconds] where each is [numerator, denominator]
   * @returns Decimal degrees representation of the coordinate
   */
  private static convertDMSToDecimal(dmsArray: number[][]): number {
    // Validate input format
    if (!Array.isArray(dmsArray) || dmsArray.length !== 3) return 0;
    
    // Extract and convert each component using safe division
    const degrees = this.safeDivide(dmsArray[0]);
    const minutes = this.safeDivide(dmsArray[1]);
    const seconds = this.safeDivide(dmsArray[2]);
    
    // Convert to decimal degrees
    return degrees + minutes / 60 + seconds / 3600;
  }

  /**
   * Processes location coordinate data from raw metadata
   * 
   * This method handles the complex task of:
   * 1. Extracting location latitude and longitude from metadata
   * 2. Converting from DMS to decimal format
   * 3. Applying hemisphere corrections (N/S for latitude, E/W for longitude)
   * 4. Formatting coordinates for display
   * 5. Generating map URLs
   * 
   * @param rawData - Raw metadata containing location information
   * @returns Processed location coordinates or null if location data is not available
   */
  private static processLocationCoordinates(rawData: MetadataData): LocationCoordinates | null {
    // Check if location data is present
    if (!rawData.GPSLatitude || !rawData.GPSLongitude) return null;

    // Extract coordinate arrays and hemisphere references
    const latArray = rawData.GPSLatitude.value;
    const lonArray = rawData.GPSLongitude.value;
    const latRefRaw = rawData.GPSLatitudeRef?.description || rawData.GPSLatitudeRef?.value || '';
    const lonRefRaw = rawData.GPSLongitudeRef?.description || rawData.GPSLongitudeRef?.value || '';

    // Normalize hemisphere references to uppercase for consistent comparison
    const normalizedLatRef = latRefRaw.toString().trim().toUpperCase();
    const normalizedLonRef = lonRefRaw.toString().trim().toUpperCase();

    // Validate that we have proper coordinate arrays
    if (!Array.isArray(latArray) || !Array.isArray(lonArray)) return null;

    // Convert DMS to decimal degrees
    let latitude = this.convertDMSToDecimal(latArray);
    let longitude = this.convertDMSToDecimal(lonArray);

    // Apply hemisphere corrections
    // Southern latitudes are negative
    if (normalizedLatRef === 'S') {
      latitude = -Math.abs(latitude);
    }

    // Western longitudes are negative
    if (normalizedLonRef.startsWith('W')) {
      longitude = -Math.abs(longitude);
    } else if (!normalizedLonRef && longitude > 0 && longitude < 180) {
      // Fallback for missing longitude reference
      // This handles cases where the hemisphere reference is missing
      longitude = -Math.abs(longitude);
    }

    // Determine display directions for formatting
    const latDir = latitude >= 0 ? 'N' : 'S';
    const lonDir = longitude >= 0 ? 'E' : 'W';

    return {
      latitude: parseFloat(latitude.toFixed(6)),
      longitude: parseFloat(longitude.toFixed(6)),
      formatted: `${Math.abs(latitude).toFixed(6)}° ${latDir}, ${Math.abs(longitude).toFixed(6)}° ${lonDir}`,
      mapsUrl: `https://maps.google.com/?q=${latitude},${longitude}`
    };
  }

  /**
   * Cleans and formats raw metadata for display
   * 
   * This method processes raw metadata by:
   * 1. Filtering out binary data and base64 content
   * 2. Extracting meaningful values from metadata objects
   * 3. Processing GPS coordinates into usable formats
   * 4. Organizing data for user-friendly display
   * 
   * @param rawData - Raw metadata from reader library
   * @returns Cleaned and formatted data object
   */
  public static cleanMetadata(rawData: MetadataData): CleanedData {
    const cleaned: CleanedData = {};
    
    // Filter out binary data and other non-displayable content
    // This prevents large base64 strings and binary buffers from cluttering the display
    const filteredData = Object.entries(rawData).reduce((acc, [key, value]) => {
      if (key !== 'base64' && (typeof value !== 'object' || (typeof value === 'object' && value !== null && !ArrayBuffer.isView(value)))) {
        acc[key] = value;
      }
      return acc;
    }, {} as MetadataData);

    // Extract meaningful values from metadata objects
    // Metadata often comes wrapped in objects with 'description' or 'value' properties
    Object.entries(filteredData).forEach(([key, value]) => {
      if (value && typeof value === 'object' && 'description' in value) {
        // Prefer human-readable descriptions when available
        cleaned[key] = value.description;
      } else if (value && typeof value === 'object' && 'value' in value) {
        // Fall back to raw values
        cleaned[key] = value.value;
      } else {
        // Use the value as-is for simple types
        cleaned[key] = value;
      }
    });

    // Process GPS coordinates into a more usable format
    const locationCoordinates = this.processLocationCoordinates(rawData);
    if (locationCoordinates) {
      // Add individual coordinate values for easy access
      cleaned.GPSLatitude = locationCoordinates.latitude;
      cleaned.GPSLongitude = locationCoordinates.longitude;
      // Add the complete coordinate object for advanced display
      cleaned.GPSCoordinates = locationCoordinates;
    }

    return cleaned;
  }

  /**
   * Main method to parse metadata from an image file
   * 
   * This is the primary entry point for metadata processing. It:
   * 1. Converts the file to an ArrayBuffer for processing
   * 2. Uses reader library to extract raw metadata
   * 3. Cleans the data for display purposes
   * 4. Returns both raw and cleaned versions
   * 
   * @param file - Image file to process
   * @returns Promise resolving to an object containing both raw and cleaned metadata
   * @throws Error if file reading or metadata parsing fails
   */
  public static async parseMetadata(file: File): Promise<{ rawData: MetadataData; cleanedData: CleanedData }> {
    // Convert file to ArrayBuffer for metadata reader
    const arrayBuffer = await file.arrayBuffer();
    
    // Extract metadata tags using reader library
    const tags = MetadataReader.load(arrayBuffer);
    
    // Prepare raw data for display by removing base64 content
    // Base64 data can be extremely large and is not useful for display
    const rawDataForDisplay = Object.entries(tags).reduce((acc, [key, value]) => {
      if (key !== 'base64') {
        acc[key] = value;
      }
      return acc;
    }, {} as MetadataData);

    // Clean and format the data for user-friendly display
    const cleanedData = this.cleanMetadata(tags);

    return {
      rawData: rawDataForDisplay,
      cleanedData
    };
  }
}