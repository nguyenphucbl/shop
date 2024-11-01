import * as httpRequest from '~/utils/httpRequest';
const getCarouselItems = async (offset, limit) => {
  try {
    const data = await httpRequest.get('products', {
      params: {
        offset,
        limit,
      },
    });
    return data;
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
    return data;
  } catch (error) {
    console.error('Error fetching carousel items', error);
  }
};
export { getCarouselItems, getCategoryItems };
