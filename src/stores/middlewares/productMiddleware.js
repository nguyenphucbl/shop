import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProducts } from '~/services/carouselService';
const getProduct = createAsyncThunk('product/getProduct', async (params, { signal }) => {
  const res = await getProducts(params, signal);

  return res.data;
});

export { getProduct };
