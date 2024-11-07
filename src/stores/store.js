import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import authReducer from './slices/authSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
  },
});
