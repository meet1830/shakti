import {Constants, User} from '../types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface AuthState {
  user: User | undefined;
  constants: Constants | undefined;
}

const initialState: AuthState = {
  user: undefined,
  constants: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
    logout: state => {
      state.user = undefined;
    },
    setConstants: (state, action: PayloadAction<Constants>) => {
      state.constants = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
