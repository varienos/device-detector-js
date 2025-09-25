/**
 * @jest-environment jsdom
 */

const DeviceDetector = require('../src/device-detector.js');

describe('DeviceDetector', () => {
  let detector;

  beforeEach(() => {
    detector = new DeviceDetector();
  });

  describe('Android Detection', () => {
    test('should detect Android devices', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36'
      });

      detector = new DeviceDetector();
      expect(detector.isAndroid()).toBe(true);
      expect(detector.isMobile()).toBe(true);
    });
  });

  describe('iOS Detection', () => {
    test('should detect iPhone', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      });

      detector = new DeviceDetector();
      expect(detector.isIOS()).toBe(true);
      expect(detector.isMobile()).toBe(true);
    });

    test('should detect iPad', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      });

      detector = new DeviceDetector();
      expect(detector.isIOS()).toBe(true);
      expect(detector.isTablet()).toBe(true);
    });
  });

  describe('Desktop Detection', () => {
    test('should detect desktop devices', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      });

      detector = new DeviceDetector();
      expect(detector.isDesktop()).toBe(true);
      expect(detector.isMobile()).toBe(false);
      expect(detector.isTablet()).toBe(false);
    });
  });

  describe('Device Type Detection', () => {
    test('should return correct device type for mobile', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      });

      detector = new DeviceDetector();
      expect(detector.getDeviceType()).toBe('mobile');
    });

    test('should return correct device type for tablet', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      });

      detector = new DeviceDetector();
      expect(detector.getDeviceType()).toBe('tablet');
    });

    test('should return correct device type for desktop', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      });

      detector = new DeviceDetector();
      expect(detector.getDeviceType()).toBe('desktop');
    });
  });

  describe('Device Info', () => {
    test('should return complete device information', () => {
      Object.defineProperty(navigator, 'userAgent', {
        writable: true,
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15'
      });

      detector = new DeviceDetector();
      const info = detector.getDeviceInfo();

      expect(info).toHaveProperty('isMobile');
      expect(info).toHaveProperty('isTablet');
      expect(info).toHaveProperty('isDesktop');
      expect(info).toHaveProperty('isAndroid');
      expect(info).toHaveProperty('isIOS');
      expect(info).toHaveProperty('isWindowsPhone');
      expect(info).toHaveProperty('deviceType');
      expect(info).toHaveProperty('userAgent');

      expect(info.isMobile).toBe(true);
      expect(info.isIOS).toBe(true);
      expect(info.deviceType).toBe('mobile');
    });
  });
});