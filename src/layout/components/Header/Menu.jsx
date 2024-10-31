import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);
import PropTypes from 'prop-types';
Menu.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};
export default function Menu({ to, children, ...props }) {
  return (
    <NavLink to={to} end className={nav => cx('nav-item', { active: nav.isActive })} {...props}>
      {children}
    </NavLink>
  );
}
