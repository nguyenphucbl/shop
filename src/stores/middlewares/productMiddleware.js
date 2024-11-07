import { createAsyncThunk } from '@reduxjs/toolkit';

import { getProductById, getProducts } from '~/services/carouselService';
const getProduct = createAsyncThunk('product/getProduct', async (params, { signal }) => {
  const res = await getProducts(params, signal);
  return res.data;
});
const getProductDetail = createAsyncThunk('product/getProductById', async (id, { signal }) => {
  const res = await getProductById(id, signal);
  return res;
});
export { getProduct, getProductDetail };
