import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  total: 0,
  count: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      state.count += 1;
      state.total += product.price;
    },
    removeFromCart: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      state.cart = state.cart.filter(item => item.id !== action.payload);
      state.count -= 1;
      state.total -= product.price;
    },
    reduceQuantity: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cart = state.cart.filter(item => item.id !== action.payload);
      }
      state.count -= 1;
      state.total -= product.price;
    },
    addQuantity: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      product.quantity += 1;
      state.count += 1;
      state.total += product.price;
    },
  },
});

export const { addToCart, reduceQuantity, removeFromCart, addQuantity } = cartSlice.actions;
export default cartSlice.reducer;
