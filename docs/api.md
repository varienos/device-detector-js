# API Documentation

## DeviceDetector Class

The main class for device detection functionality.

### Constructor

```javascript
const detector = new DeviceDetector();
```

Creates a new DeviceDetector instance. The constructor automatically captures the current user agent string.

### Methods

#### Device Type Detection Methods

##### `isMobile()`
- **Returns**: `boolean`
- **Description**: Returns `true` if the current device is detected as a mobile device.
- **Example**:
```javascript
if (detector.isMobile()) {
  console.log('Mobile device detected');
}
```

##### `isTablet()`
- **Returns**: `boolean`
- **Description**: Returns `true` if the current device is detected as a tablet.
- **Example**:
```javascript
if (detector.isTablet()) {
  console.log('Tablet device detected');
}
```

##### `isDesktop()`
- **Returns**: `boolean`
- **Description**: Returns `true` if the current device is detected as a desktop/laptop computer.
- **Example**:
```javascript
if (detector.isDesktop()) {
  console.log('Desktop device detected');
}
```

#### Platform Detection Methods

##### `isAndroid()`
- **Returns**: `boolean`
- **Description**: Returns `true` if the current device is running Android OS.
- **Example**:
```javascript
if (detector.isAndroid()) {
  console.log('Android device detected');
}
```

##### `isIOS()`
- **Returns**: `boolean`
- **Description**: Returns `true` if the current device is running iOS (iPhone, iPad, iPod).
- **Example**:
```javascript
if (detector.isIOS()) {
  console.log('iOS device detected');
}
```

##### `isWindowsPhone()`
- **Returns**: `boolean`
- **Description**: Returns `true` if the current device is a Windows Phone.
- **Example**:
```javascript
if (detector.isWindowsPhone()) {
  console.log('Windows Phone detected');
}
```

##### `isOtherMobile()`
- **Returns**: `boolean`
- **Description**: Returns `true` if the device is a mobile device not covered by other specific methods (webOS, BlackBerry, Opera Mini, etc.).
- **Example**:
```javascript
if (detector.isOtherMobile()) {
  console.log('Other mobile device detected');
}
```

#### Utility Methods

##### `getDeviceType()`
- **Returns**: `'mobile' | 'tablet' | 'desktop'`
- **Description**: Returns the device type as a string.
- **Example**:
```javascript
const deviceType = detector.getDeviceType();
console.log(`Device type: ${deviceType}`);
// Output: "Device type: mobile"
```

##### `getDeviceInfo()`
- **Returns**: `Object`
- **Description**: Returns a comprehensive object containing all device detection results.
- **Return Object Structure**:
```javascript
{
  isMobile: boolean,      // Result of isMobile()
  isTablet: boolean,      // Result of isTablet()
  isDesktop: boolean,     // Result of isDesktop()
  isAndroid: boolean,     // Result of isAndroid()
  isIOS: boolean,         // Result of isIOS()
  isWindowsPhone: boolean, // Result of isWindowsPhone()
  deviceType: string,     // Result of getDeviceType()
  userAgent: string       // Current user agent string
}
```
- **Example**:
```javascript
const info = detector.getDeviceInfo();
console.log(info);
```

## Global Instance

For convenience, a global instance is automatically created when the library is loaded in a browser environment:

```javascript
// Global instance is available as 'deviceDetector'
if (deviceDetector.isMobile()) {
  console.log('Mobile detected using global instance');
}
```

## Module Support

The library supports multiple module systems:

### CommonJS (Node.js)
```javascript
const DeviceDetector = require('device-detector-js');
const detector = new DeviceDetector();
```

### ES6 Modules
```javascript
import DeviceDetector from 'device-detector-js';
const detector = new DeviceDetector();
```

### AMD (RequireJS)
```javascript
require(['device-detector'], function(DeviceDetector) {
  const detector = new DeviceDetector();
});
```

### Browser Global
```html
<script src="device-detector.min.js"></script>
<script>
  // Use global DeviceDetector class or deviceDetector instance
  const detector = new DeviceDetector();
  // or
  if (deviceDetector.isMobile()) { /* ... */ }
</script>
```

## Detection Logic

### Mobile Detection
A device is considered mobile if it matches any of the following:
- Android mobile devices
- iOS devices (iPhone, iPod)
- Windows Phone devices
- Other mobile platforms (webOS, BlackBerry, Opera Mini)

### Tablet Detection
A device is considered a tablet based on specific user agent patterns including:
- iPad
- Android tablets (Android without "mobile" keyword)
- Windows tablets with touch support
- Kindle, Playbook, Silk browsers
- Other tablet-specific patterns

### Desktop Detection
A device is considered desktop if it's neither mobile nor tablet.

## User Agent Examples

### Mobile User Agents
```
// iPhone
Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15

// Android Phone
Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36

// Windows Phone
Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0)
```

### Tablet User Agents
```
// iPad
Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15

// Android Tablet
Mozilla/5.0 (Linux; Android 11; SM-T870) AppleWebKit/537.36
```

### Desktop User Agents
```
// Windows Chrome
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36

// macOS Safari
Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15

// Linux Firefox
Mozilla/5.0 (X11; Linux x86_64; rv:91.0) Gecko/20100101 Firefox/91.0
```