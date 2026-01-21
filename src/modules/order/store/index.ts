import {Order, OrdersByUser} from '../types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface OrdersState {
  orders: OrdersByUser | undefined;
  lastUpdatedAt: string | undefined;
}

const initialState: OrdersState = {
  orders: undefined,
  lastUpdatedAt: undefined,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<{userId: string; orders: Order[]}>,
    ) => {
      const {userId, orders} = action.payload || {};
      if (!state.orders) {
        state.orders = {[userId]: orders};
      } else {
        state.orders = {...state.orders, [userId]: orders};
      }
      state.lastUpdatedAt = new Date().toString();
    },
    createOrder: (
      state,
      action: PayloadAction<{userId: string; order: Order}>,
    ) => {
      const {userId, order} = action.payload || {};
      if (!state.orders) {
        state.orders = {[userId]: [order]};
      } else if (!state.orders[userId]) {
        state.orders = {
          ...state.orders,
          [userId]: [order],
        };
      } else if (state.orders[userId]?.length) {
        state.orders = {
          ...state.orders,
          [userId]: [order, ...state.orders[userId]],
        };
      }
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;
