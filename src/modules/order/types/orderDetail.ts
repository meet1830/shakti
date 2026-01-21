export type OrderDetailSource = 'Cart' | 'Order' | undefined;

export type OrderDetailParams =
  | {orderId?: string; source?: OrderDetailSource}
  | undefined;
