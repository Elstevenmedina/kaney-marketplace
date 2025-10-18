import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './slices/authSlice';
import marketplaceReducer from './slices/marketplaceSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';
import customerProfileReducer from './slices/customerProfileSlice';
import uiReducer from './slices/uiSlice';
import { cartMiddleware } from './middleware/cartMiddleware';

// Persist configuration
const persistConfig = {
  key: 'kaney-marketplace-root',
  version: 1,
  storage,
  whitelist: ['auth', 'cart', 'ui'], // Only persist these reducers
  blacklist: ['marketplace', 'checkout', 'customer'] // Don't persist these
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  marketplace: marketplaceReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  customer: customerProfileReducer,
  ui: uiReducer
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(cartMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

// Create persistor
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
