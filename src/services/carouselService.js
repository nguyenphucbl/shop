import * as httpRequest from '~/utils/httpRequest';
const getCarouselItems = async (offset, limit, signal) => {
  try {
    const data = await httpRequest.get('products', {
      params: {
        offset,
        limit,
      },
      signal,
    });
    return data.data;
  } catch (error) {
    console.error('Error fetching carousel items', error);
  }
};
const getCategoryItems = async (offset, limit) => {
  try {
    const data = await httpRequest.get('categories', {
      params: {
        offset,
        limit,
      },
    });
    return data.data;
  } catch (error) {
    console.error('Error fetching carousel items', error);
  }
};
const getProducts = async (params, signal) => {
  try {
    const data = await httpRequest.get('products', {
      params,
      signal,
    });

    return data;
  } catch (error) {
    console.error('Error fetching products', error);
  }
};
const getProductById = async (id, signal) => {
  try {
    const data = await httpRequest.get(`products/${id}`, {
      signal,
    });
    return data.data;
  } catch (error) {
    console.error('Error fetching product by id', error);
  }
};
export { getCarouselItems, getCategoryItems, getProducts, getProductById };
