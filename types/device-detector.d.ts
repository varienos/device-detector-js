declare class DeviceDetector {
  constructor();

  /**
   * Check if the device is mobile
   */
  isMobile(): boolean;

  /**
   * Check if the device is Android
   */
  isAndroid(): boolean;

  /**
   * Check if the device is iOS (iPhone, iPad, iPod)
   */
  isIOS(): boolean;

  /**
   * Check if the device is Windows Phone
   */
  isWindowsPhone(): boolean;

  /**
   * Check if the device is other mobile devices
   */
  isOtherMobile(): boolean;

  /**
   * Check if the device is tablet
   */
  isTablet(): boolean;

  /**
   * Check if the device is desktop
   */
  isDesktop(): boolean;

  /**
   * Get device type as string
   */
  getDeviceType(): 'mobile' | 'tablet' | 'desktop';

  /**
   * Get detailed device information
   */
  getDeviceInfo(): {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isAndroid: boolean;
    isIOS: boolean;
    isWindowsPhone: boolean;
    deviceType: 'mobile' | 'tablet' | 'desktop';
    userAgent: string;
  };
}

declare const deviceDetector: DeviceDetector;

export = DeviceDetector;
export as namespace DeviceDetector;