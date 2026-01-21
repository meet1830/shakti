import {Dimensions} from 'react-native';

export const {height: screenHeight, width: screenWidth} =
  Dimensions.get('screen');
export const {height: windowHeight, width: windowWidth} =
  Dimensions.get('window');

export enum FONTS {
  // heading = 'CormorantGaramond-Medium',
  // heading2 = 'CormorantGaramond-Regular',
  heading = '',
  heading2 = '',
}

export enum Colors {
  primary = '#FFC201',
  active = '#1054E8',
  inactive = '#666',
  background = '#F8F8F8',
  white = '#fff',
  text = '#222',
  error = '#e54f37',
  lightRed = '#ff4654',
  success = '#40d689',
  black = '#000',
  lightYellow = '#F8DE7E',
  disabled = '#ededed',
}

export const shadow = {
  0: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  1: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  2: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  3: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  4: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  5: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  6: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  7: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  8: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  9: {
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
};

// eslint-disable-next-line no-useless-escape
export const phoneNumberIndiaRegex = /^(\+91[\-\s]?)?[0]?[6789]\d{9}$/;

export const defaultCity = 'Vadodara';
export const MIN_ORDER_VALUE = 28000;
export const DEFAULT_DELIVERY_FEE = 7000;
export const FREE_DELIVERY_ORDER_VALUE = 50000;
export const CACHE_TIME = 1;
