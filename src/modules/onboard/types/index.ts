export enum AuthType {
  google = 'google',
  apple = 'apple',
}

export interface UserAddress {
  street: string;
  landmark: string;
  area: string;
  city: string;
  zipCode: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  address?: UserAddress[];
  phone?: string;
}

export type LoginUserParams =
  | {
      authType: AuthType.google;
      idToken: string;
    }
  | {
      authType: AuthType.apple;
      idToken: string;
      email: string | null;
      fullname: string | null;
    };

export interface LoginUserResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export enum ConstantsKey {
  CACHE_TIME = 'CACHE_TIME',
  MIN_ORDER_VALUE = 'MIN_ORDER_VALUE',
  DEFAULT_DELIVERY_FEE = 'DEFAULT_DELIVERY_FEE',
  FREE_DELIVERY_ORDER_VALUE = 'FREE_DELIVERY_ORDER_VALUE',
}

export type Constants = {
  [key in ConstantsKey]: string;
};
