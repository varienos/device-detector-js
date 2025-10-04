# Device Detector

A lightweight, fast, and reliable JavaScript library for detecting device types (mobile, tablet, desktop) based on user agent strings.

[![npm version](https://badge.fury.io/js/@varienos%2Fdevice-detector-js.svg)](https://badge.fury.io/js/@varienos%2Fdevice-detector-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/varienos/device-detector-js.svg?branch=main)](https://travis-ci.org/varienos/device-detector-js)

## Features

- **Lightweight**: Only ~2KB minified and gzipped
- **Fast**: No dependencies, pure JavaScript
- **Accurate**: Detects mobile, tablet, and desktop devices
- **Flexible**: Works in browser, Node.js, and AMD environments
- **Comprehensive**: Supports iOS, Android, Windows Phone, and more
- **Client Hint aware**: Leverages `navigator.userAgentData` when available with legacy fallbacks
- **Modern**: ES6+ class-based architecture with backward compatibility

## Installation

### npm
```bash
npm install @varienos/device-detector-js
```

### CDN
```html
<script src="https://unpkg.com/@varienos/device-detector-js@latest/dist/device-detector.min.js"></script>
```

## Usage

### Browser (Global)
```html
<script src="dist/device-detector.min.js"></script>
<script>
  // Using the global instance
  if (deviceDetector.isMobile()) {
    console.log('This is a mobile device!');
  }

  // Or create a new instance
  const detector = new DeviceDetector();
  console.log('Device type:', detector.getDeviceType());
</script>
```

### ES6 Modules
```javascript
import DeviceDetector from '@varienos/device-detector-js';

const detector = new DeviceDetector();

if (detector.isMobile()) {
  console.log('Mobile device detected!');
}
```

### CommonJS (Node.js)
```javascript
const DeviceDetector = require('@varienos/device-detector-js');

const detector = new DeviceDetector();
console.log('Device info:', detector.getDeviceInfo());
```

### AMD (RequireJS)
```javascript
require(['device-detector'], function(DeviceDetector) {
  const detector = new DeviceDetector();
  console.log('Is tablet?', detector.isTablet());
});
```

## API Reference

### Methods

#### Device Type Detection
- `isMobile()` - Returns `true` if device is mobile
- `isTablet()` - Returns `true` if device is tablet
- `isDesktop()` - Returns `true` if device is desktop

#### Platform Detection
- `isAndroid()` - Returns `true` if device is Android
- `isIOS()` - Returns `true` if device is iOS (iPhone, iPad, iPod)
- `isWindowsPhone()` - Returns `true` if device is Windows Phone

#### Utility Methods
- `getDeviceType()` - Returns device type as string: `'mobile'`, `'tablet'`, or `'desktop'`
- `getDeviceInfo()` - Returns detailed device information object

### Example Response
```javascript
const detector = new DeviceDetector();
console.log(detector.getDeviceInfo());

// Example output:
{
  isMobile: false,
  isTablet: true,
  isDesktop: false,
  isAndroid: false,
  isIOS: true,
  isWindowsPhone: false,
  deviceType: 'tablet',
  userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X)...'
}
```

## Examples

### Responsive Design
```javascript
const detector = new DeviceDetector();

// Apply different styles based on device
if (detector.isMobile()) {
  document.body.classList.add('mobile-layout');
} else if (detector.isTablet()) {
  document.body.classList.add('tablet-layout');
} else {
  document.body.classList.add('desktop-layout');
}
```

### Conditional Loading
```javascript
const detector = new DeviceDetector();

// Load different resources for different devices
if (detector.isMobile()) {
  // Load mobile-optimized resources
  loadScript('js/mobile-app.js');
} else {
  // Load full desktop application
  loadScript('js/desktop-app.js');
}
```

### Analytics
```javascript
const detector = new DeviceDetector();

// Track device types in analytics
analytics.track('page_view', {
  device_type: detector.getDeviceType(),
  is_mobile: detector.isMobile(),
  platform: detector.isIOS() ? 'ios' : detector.isAndroid() ? 'android' : 'other'
});
```

## Browser Support

- Chrome, Edge, and other Chromium-based browsers (recent releases)
- Firefox (recent releases)
- Safari on macOS and iOS
- Legacy Internet Explorer 11 (no official guarantee beyond basic UA checks)
- Mobile browsers that still expose a user-agent string

## Detection Notes

- The library consults `navigator.userAgentData` (User-Agent Client Hints) when the browser exposes it, then falls back to classic user-agent parsing. Results depend on what the browser chooses to share.
- User-agent strings are being reduced over time; keep detection logic as a progressive enhancement rather than a security boundary.
- `isWindowsPhone()` stays available for existing consumers, but Windows Phone is officially unsupported. Monitor analytics before relying on it in new features.

## Testing

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## Development

```bash
# Install dependencies
npm install

# Start the live example server
npm run dev

# Lint code
npm run lint

# Build minified bundle
npm run build
```
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
