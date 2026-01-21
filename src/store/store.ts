import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import {configureStore} from '@reduxjs/toolkit';
import {reduxStorage} from './storage';
import rootReducer from './rootReducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: reduxStorage,
  whitelist: ['auth', 'home', 'cart', 'order'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persist uses non-serializable actions that we need to ignore
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
