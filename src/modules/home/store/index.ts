import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import {AllProducts} from '../types';

interface HomeState {
  allProducts: AllProducts | undefined;
}

const initialState: HomeState = {
  allProducts: undefined,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setAllProducts: (state, action: PayloadAction<AllProducts>) => {
      state.allProducts = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;
export default homeSlice.reducer;
