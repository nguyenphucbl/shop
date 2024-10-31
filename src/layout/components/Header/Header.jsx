import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import images from '~/assets/images';
import { Button } from '~/components/Button';
import config from '~/config';
import styles from './Header.module.scss';
import Menu from './Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
export default function Header() {
  return (
    <header className={cx('wrapper', 'container-fluid')}>
      <img src={images.logo} alt='logo' className={cx('logo')} />
      <nav className={cx('nav')}>
        <Menu to={config.routes.home}>Home</Menu>
        <Menu to={config.routes.products}>Products</Menu>
        <Menu to={config.routes.cart}>
          Cart
          <FontAwesomeIcon icon={faCartShopping} className={cx('cart-icon')} />
        </Menu>
      </nav>
      <div>
        <Button primary size='sm'>
          Login
        </Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
}
