import {Cart, UserCart} from '../types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {Product} from '@modules/home/types';

interface CartState {
  cart: Cart | undefined;
}

const initialState: CartState = {
  cart: undefined,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (
      state,
      action: PayloadAction<{userId: string; userCart: UserCart}>,
    ) => {
      const {userId, userCart} = action.payload;
      if (!state.cart) {
        state.cart = {[userId]: userCart};
      } else {
        state.cart[userId] = userCart;
      }
    },
    updateCart: (
      state,
      action: PayloadAction<{userId: string; item: Product; quantity: number}>,
    ) => {
      const {userId, item, quantity} = action.payload || {};
      if (!userId || !item || quantity === undefined) {
        return;
      } else if (!state.cart) {
        state.cart = {[userId]: {[item?._id]: {...item, quantity}}};
      } else {
        if (quantity > 0) {
          state.cart[userId][item?._id] = {...item, quantity};
        } else {
          delete state.cart[userId][item?._id];
        }
      }
    },
    clearCart: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      if (state.cart?.[userId]) {
        state.cart[userId] = {};
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
