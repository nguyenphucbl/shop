import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import { Button } from '~/components/Button';
import config from '~/config';
import styles from './Header.module.scss';
import Menu from './Menu';
import { logout } from '~/stores/slices/authSlice';
import { useEffect, useRef, useState } from 'react';
import { getProfileUser } from '~/stores/middlewares/authMiddleware';
import { Image } from '~/components';
const cx = classNames.bind(styles);
export default function Header() {
  const [active, setActive] = useState(false);
  const { user, profileStatus } = useSelector(state => state.auth);
  const { count } = useSelector(state => state.cart);

  const info = useRef(null);
  const dispatch = useDispatch();
  const toggleActive = () => {
    setActive(!active);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      dispatch(logout());
      navigate(config.routes.login);
    }
  };
  useEffect(() => {
    if (!Cookies.get('access_token')) return;
    if (profileStatus === 'idle') {
      dispatch(getProfileUser());
    }
  }, [dispatch, profileStatus]);
  return (
    <header className={cx('wrapper', 'container-fluid')}>
      <Link to={config.routes.home}>
        <img src={images.logo} alt='logo' className={cx('logo')} />
      </Link>
      <nav className={cx('nav')}>
        <Menu to={config.routes.home}>Home</Menu>
        <Menu to={config.routes.products}>Products</Menu>
        <Menu to={config.routes.cart}>
          Cart
          <FontAwesomeIcon icon={faCartShopping} className={cx('cart-icon')} />
          {count > 0 && <span className={cx('cart-count')}>{count}</span>}
        </Menu>
      </nav>
      <div>
        {profileStatus === 'loading' ? (
          <div className='spinner-border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : user ? (
          <div className={cx('account')}>
            <Image src={user.avatar} alt='avatar' className={cx('avatar')} onClick={toggleActive} />
            <div ref={info} className={cx('info', { active })}>
              <Link to='/user' className={cx('info-item')}>
                User
              </Link>
              <Link to='/setting' className={cx('info-item')}>
                Settings
              </Link>
              <div className={cx('info-item')} onClick={handleLogout}>
                Logout
              </div>
            </div>
          </div>
        ) : (
          <>
            <Button to={config.routes.login} primary size='sm'>
              Login
            </Button>
            <Button to={config.routes.signup}>Sign Up</Button>
          </>
        )}
      </div>
    </header>
  );
}
