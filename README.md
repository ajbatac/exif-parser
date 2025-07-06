# Image Metadata Parser

A modern, web-based metadata extraction tool built with React, TypeScript, and Tailwind CSS. Extract and visualize image metadata with advanced coordinate processing and beautiful, responsive design.

![Image Metadata Parser](https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

- **🔍 Comprehensive Metadata Extraction**: Support for JPEG, TIFF, and other image formats
- **🗺️ Advanced Location Processing**: Convert DMS coordinates to decimal with map integration
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **⚡ Real-time Processing**: Client-side processing with no server uploads required
- **🎨 Modern Interface**: Gradient-based design with smooth animations
- **🔒 Privacy-First**: All processing happens locally in your browser

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Modern web browser with File API support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/image-metadata-parser.git
   cd image-metadata-parser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── DataDisplay.tsx   # Metadata visualization
│   ├── ErrorState.tsx    # Error handling UI
│   ├── FileUpload.tsx    # File upload interface
│   ├── LocationDisplay.tsx # Location coordinate display
│   ├── ImagePreview.tsx  # Image preview component
│   ├── LoadingState.tsx  # Loading indicators
│   └── NavigationMenu.tsx # Section navigation
├── services/            # Business logic
│   └── MetadataService.ts # Metadata processing service
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css         # Global styles
```

## 🧩 Component Architecture

### Core Components

#### `App.tsx`
- **Purpose**: Main application orchestrator
- **Responsibilities**: State management, file handling, error management
- **Key Features**: File upload coordination, metadata processing, UI state control

#### `MetadataService.ts`
- **Purpose**: Metadata extraction and processing engine
- **Responsibilities**: Coordinate conversion, data cleaning, location processing
- **Key Features**: DMS to decimal conversion, hemisphere detection, data formatting

#### `DataDisplay.tsx`
- **Purpose**: Dual-column metadata visualization
- **Responsibilities**: Cleaned data display, raw JSON presentation
- **Key Features**: Icon categorization, scrollable containers, special location handling

#### `LocationDisplay.tsx`
- **Purpose**: Enhanced coordinate visualization
- **Responsibilities**: Coordinate formatting, map integration
- **Key Features**: Multiple coordinate formats, clickable map links, embedded maps

#### `FileUpload.tsx`
- **Purpose**: File upload interface with drag-and-drop
- **Responsibilities**: File selection, validation, upload feedback
- **Key Features**: Visual drop zones, file type restrictions, loading states

### Supporting Components

#### `ImagePreview.tsx`
- **Purpose**: Responsive image display
- **Features**: Aspect ratio preservation, size constraints, file name display

#### `NavigationMenu.tsx`
- **Purpose**: Smooth scrolling navigation
- **Features**: Section jumping, conditional rendering, responsive design

#### `LoadingState.tsx` & `ErrorState.tsx`
- **Purpose**: User feedback during processing
- **Features**: Animated indicators, clear messaging, error recovery

## 🛠️ Technical Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript 5.5.3**: Full type safety and enhanced developer experience
- **Vite 5.4.2**: Fast build tool with HMR and optimized bundling

### Styling & UI
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **Lucide React 0.344.0**: Beautiful, customizable icons
- **PostCSS**: CSS processing with Autoprefixer

### Core Libraries
- **Metadata Reader 4.31.1**: Comprehensive metadata extraction
- **React DOM 18.3.1**: DOM rendering and manipulation

### Development Tools
- **Code Quality Tools 9.9.1**: Code linting with TypeScript support
- **TypeScript Linting**: Enhanced linting for TypeScript
- **React Hooks ESLint**: React-specific linting rules

## 🔧 Configuration Files

### Build Configuration
- `vite.config.ts`: Vite build configuration
- `tsconfig.json`: TypeScript compiler options
- `tailwind.config.js`: Tailwind CSS customization
- `postcss.config.js`: PostCSS plugin configuration

### Code Quality
- `eslint.config.js`: Code quality rules and plugins
- `.gitignore`: Git ignore patterns

## 📊 Data Processing Flow

1. **File Upload**: User selects image file via drag-and-drop or file picker
2. **Validation**: File type validation and size checks
3. **Metadata Extraction**: Raw metadata extraction using reader library
4. **Data Processing**: Coordinate conversion and data cleaning
5. **Visualization**: Dual display of cleaned and raw data
6. **Location Enhancement**: Map integration for location data

### Location Coordinate Processing

The application handles complex coordinate conversion:

```typescript
// DMS to Decimal Conversion
decimal = degrees + (minutes/60) + (seconds/3600)

// Hemisphere Correction
if (hemisphere === 'S' || hemisphere === 'W') {
  coordinate = -Math.abs(coordinate)
}
```

## 🐳 Docker Support

### Development Environment
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production Deployment
```bash
docker-compose -f docker-compose.prod.yml up
```

## 📦 Package Management

The project uses standard package management. Key scripts:

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run code quality checks

## 🔒 Security & Privacy

- **Client-Side Processing**: No server uploads required
- **Memory Management**: Automatic cleanup of object URLs
- **Input Validation**: File type and size restrictions
- **XSS Prevention**: Binary data filtering and sanitization

## 🌐 Browser Support

- **Modern Browsers**: Latest versions of major browsers
- **Required APIs**: File API, ArrayBuffer, Object URL
- **Responsive Design**: Mobile and desktop optimized

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Maintain component documentation
- Add comprehensive comments
- Follow SOLID principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Metadata Reader**: Comprehensive metadata extraction library
- **Tailwind CSS**: Utility-first CSS framework
- **Icon Library**: Beautiful icon collection
- **React Team**: Amazing frontend framework
- **Vite Team**: Lightning-fast build tool

## 📞 Support

For support, please open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and modern web technologies**