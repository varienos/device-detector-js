/**
 * @jest-environment jsdom
 */

const DeviceDetector = require('../src/device-detector.js');

const setNavigatorProp = (prop, value) => {
  Object.defineProperty(navigator, prop, {
    configurable: true,
    enumerable: true,
    writable: true,
    value
  });
};

const resetNavigatorProp = (prop) => {
  if (Object.prototype.hasOwnProperty.call(navigator, prop)) {
    delete navigator[prop];
  }
};

describe('DeviceDetector', () => {
  let detector;

  beforeEach(() => {
    detector = new DeviceDetector();
  });

  afterEach(() => {
    resetNavigatorProp('userAgent');
    resetNavigatorProp('userAgentData');
  });

  describe('Android Detection', () => {
    test('should detect Android devices', () => {
      setNavigatorProp('userAgent', 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36');

      detector = new DeviceDetector();
      expect(detector.isAndroid()).toBe(true);
      expect(detector.isMobile()).toBe(true);
    });
  });

  describe('iOS Detection', () => {
    test('should detect iPhone', () => {
      setNavigatorProp('userAgent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15');

      detector = new DeviceDetector();
      expect(detector.isIOS()).toBe(true);
      expect(detector.isMobile()).toBe(true);
    });

    test('should detect iPad', () => {
      setNavigatorProp('userAgent', 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15');

      detector = new DeviceDetector();
      expect(detector.isIOS()).toBe(true);
      expect(detector.isTablet()).toBe(true);
    });
  });

  describe('Desktop Detection', () => {
    test('should detect desktop devices', () => {
      setNavigatorProp('userAgent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

      detector = new DeviceDetector();
      expect(detector.isDesktop()).toBe(true);
      expect(detector.isMobile()).toBe(false);
      expect(detector.isTablet()).toBe(false);
    });
  });

  describe('Device Type Detection', () => {
    test('should return correct device type for mobile', () => {
      setNavigatorProp('userAgent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15');

      detector = new DeviceDetector();
      expect(detector.getDeviceType()).toBe('mobile');
    });

    test('should return correct device type for tablet', () => {
      setNavigatorProp('userAgent', 'Mozilla/5.0 (iPad; CPU OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15');

      detector = new DeviceDetector();
      expect(detector.getDeviceType()).toBe('tablet');
    });

    test('should return correct device type for desktop', () => {
      setNavigatorProp('userAgent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

      detector = new DeviceDetector();
      expect(detector.getDeviceType()).toBe('desktop');
    });
  });

  describe('User-Agent Client Hints Integration', () => {
    test('should treat userAgentData.mobile as authoritative for mobile devices', () => {
      setNavigatorProp('userAgentData', { mobile: true, platform: 'Android', brands: [] });
      setNavigatorProp('userAgent', '');

      detector = new DeviceDetector();
      expect(detector.isMobile()).toBe(true);
      expect(detector.isAndroid()).toBe(true);
    });

    test('should remain desktop when userAgentData.mobile is false and UA is desktop', () => {
      setNavigatorProp('userAgentData', { mobile: false, platform: 'Windows', brands: [] });
      setNavigatorProp('userAgent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');

      detector = new DeviceDetector();
      expect(detector.isMobile()).toBe(false);
      expect(detector.isDesktop()).toBe(true);
    });
  });

  describe('Device Info', () => {
    test('should return complete device information', () => {
      setNavigatorProp('userAgent', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15');

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
