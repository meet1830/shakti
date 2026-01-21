import {Product} from '@modules/home/types';

export interface UserCart {
  [productId: string]: CartItem;
}

export interface Cart {
  [userId: string]: UserCart;
}

export interface CartItem extends Product {
  quantity: number;
}

export type CartNavigationParams =
  | {
      source?: 'ItemDetail';
    }
  | undefined;
