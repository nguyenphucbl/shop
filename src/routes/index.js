import config from '~/config';
import { Home, ProductDetail, Products, Cart, Login, Signup } from '~/pages';

const publicRoutes = [
  {
    path: config.routes.home,
    element: Home,
  },
  {
    path: config.routes.products,
    element: Products,
  },
  {
    path: config.routes.productDetail,
    element: ProductDetail,
  },
  {
    path: config.routes.login,
    element: Login,
  },
  {
    path: config.routes.signup,
    element: Signup,
  },
];
const privateRoutes = [
  {
    path: config.routes.cart,
    element: Cart,
  },
];
export { publicRoutes, privateRoutes };
