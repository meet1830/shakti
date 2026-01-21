import authReducer from '@modules/onboard/store/index';
import cartReducer from '@modules/cart/store/index';
import {combineReducers} from '@reduxjs/toolkit';
import homeReducer from '@modules/home/store/index';
import orderReducer from '@modules/order/store/index';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  cart: cartReducer,
  order: orderReducer,
});

export default rootReducer;
