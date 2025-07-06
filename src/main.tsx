/**
 * Application entry point
 * 
 * This file serves as the main entry point for the React application.
 * It handles:
 * - Root element selection and validation
 * - React application mounting
 * - CSS imports for styling
 * 
 * Note: StrictMode has been removed to avoid potential compatibility issues
 * with certain libraries while maintaining development benefits through
 * other tooling (ESLint, TypeScript, etc.)
 */

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Import Tailwind CSS and global styles

// Get the root DOM element where the React app will be mounted
const rootElement = document.getElementById('root');

// Ensure the root element exists before attempting to mount the application
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is an element with id="root" in your HTML.');
}

// Create the React root and render the main App component
createRoot(rootElement).render(<App />);