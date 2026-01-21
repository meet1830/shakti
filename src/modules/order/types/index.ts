import {CartItem} from '@modules/cart/types';
import {UserAddress} from '@modules/onboard/types';

export enum OrderStatus {
  orderPlaced = 'Order placed',
  cancelled = 'Cancelled',
  delivered = 'Delivered',
}

export interface Order {
  _id: string;
  address: UserAddress;
  phone: string;
  orderItems: CartItem[];
  status: OrderStatus;
  createdAt: Date;
}

export interface OrdersByUser {
  [userId: string]: Order[];
}
