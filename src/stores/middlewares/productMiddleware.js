import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCarouselItems } from '~/services/carouselService';
const getProduct = createAsyncThunk('product/getProduct', async (_, { signal }) => {
  const res = await getCarouselItems(0, 10, signal);

  return res;
});

export { getProduct };
