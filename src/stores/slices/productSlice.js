import { createSlice } from '@reduxjs/toolkit';
import { getProduct } from '../middlewares/productMiddleware';
const initialState = {
  products: [],
  filter: {
    limit: 10,
    offset: 0,
  },
  loading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProduct.pending, state => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        if (action.error.name === 'AbortError') {
          state.error = 'Request was aborted';
        } else {
          state.error = action.error;
        }
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
