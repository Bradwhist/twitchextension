export const MobileOrientation: { [key: string]: string } = {
  Portrait: 'Portrait',
  Landscape: 'Landscape',
}

export const DefaultMobileOrientation = MobileOrientation.Portrait;

export const MobileSizes: { [key: string]: { width: number; height: number;} } = Object.freeze({
  'iPhone X (375x822)': {
    width: 375,
    height: 822
  },
  'iPhone 8 (375x667)': {
    width: 375,
    height: 667
  },
  'iPhone 8 Plus (414x736)': {
    width: 414,
    height: 736
  },
  'Google Pixel 2 (411x731))': {
    width: 411,
    height: 731
  },
  'Samsung Galaxy S9 (360x740)': {
    width: 360,
    height: 740
  },
  'One Plus 3 (480x853)': {
    width: 480,
    height: 853
  },
});

export const DefaultMobileSize = 'iPhone X (375x822)';

