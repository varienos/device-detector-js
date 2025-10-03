/**
 * Device Detector - A lightweight JavaScript library for detecting device types
 * @version 1.0.1
 * @author Varien
 * @license MIT
 */

class DeviceDetector {
  constructor() {
    const nav = typeof navigator !== 'undefined' ? navigator : {};
    this.userAgentData = nav.userAgentData || null;
    this.userAgent = typeof nav.userAgent === 'string' ? nav.userAgent : '';
  }

  hasUserAgentDataPlatform(pattern) {
    return Boolean(
      this.userAgentData &&
      typeof this.userAgentData.platform === 'string' &&
      pattern.test(this.userAgentData.platform)
    );
  }

  /**
   * Check if the device is mobile
   * @returns {boolean} True if device is mobile
   */
  isMobile() {
    if (this.userAgentData && this.userAgentData.mobile === true) {
      return true;
    }

    return this.isAndroid() || this.isIOS() || this.isWindowsPhone() || this.isOtherMobile();
  }

  /**
   * Check if the device is Android
   * @returns {boolean} True if device is Android
   */
  isAndroid() {
    if (this.hasUserAgentDataPlatform(/android/i)) {
      return true;
    }

    return /Android/i.test(this.userAgent);
  }

  /**
   * Check if the device is iOS (iPhone, iPad, iPod)
   * @returns {boolean} True if device is iOS
   */
  isIOS() {
    if (this.hasUserAgentDataPlatform(/ios|ipad|iphone/i)) {
      return true;
    }

    return /iPhone|iPad|iPod/i.test(this.userAgent) && !(typeof window !== 'undefined' && window.MSStream);
  }

  /**
   * Check if the device is Windows Phone
   * @returns {boolean} True if device is Windows Phone
   * @deprecated Windows Phone reached end of support; retained for backwards compatibility.
   */
  isWindowsPhone() {
    return /Windows Phone|IEMobile/i.test(this.userAgent);
  }

  /**
   * Check if the device is other mobile devices
   * @returns {boolean} True if device is other mobile
   */
  isOtherMobile() {
    return /webOS|BlackBerry|Opera Mini/i.test(this.userAgent);
  }

  /**
   * Check if the device is tablet
   * @returns {boolean} True if device is tablet
   */
  isTablet() {
    const ua = this.userAgent.toLowerCase();
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua);
  }

  /**
   * Check if the device is desktop
   * @returns {boolean} True if device is desktop
   */
  isDesktop() {
    return !this.isMobile() && !this.isTablet();
  }

  /**
   * Get device type as string
   * @returns {string} Device type: 'mobile', 'tablet', or 'desktop'
   */
  getDeviceType() {
    if (this.isTablet()) return 'tablet';
    if (this.isMobile()) return 'mobile';
    return 'desktop';
  }

  /**
   * Get detailed device information
   * @returns {Object} Device information object
   */
  getDeviceInfo() {
    return {
      isMobile: this.isMobile(),
      isTablet: this.isTablet(),
      isDesktop: this.isDesktop(),
      isAndroid: this.isAndroid(),
      isIOS: this.isIOS(),
      isWindowsPhone: this.isWindowsPhone(),
      deviceType: this.getDeviceType(),
      userAgent: this.userAgent
    };
  }
}

// For backwards compatibility - create global object
const deviceDetector = new DeviceDetector();

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DeviceDetector;
} else if (typeof define === 'function' && define.amd) {
  define([], function() {
    return DeviceDetector;
  });
} else {
  window.DeviceDetector = DeviceDetector;
  window.deviceDetector = deviceDetector;
}
