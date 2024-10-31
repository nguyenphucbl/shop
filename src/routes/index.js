import config from '~/config';
import { Home, Products } from '~/pages';

const publicRoutes = [
  {
    path: config.routes.home,
    element: Home,
  },
  {
    path: config.routes.products,
    element: Products,
  },
];

export { publicRoutes };
