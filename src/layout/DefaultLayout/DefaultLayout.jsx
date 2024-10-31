import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const cx = classNames.bind(styles);
DefaultLayout.propTypes = {
  children: PropTypes.node,
};
export default function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />

      <main className={cx('body', 'container')}>{children}</main>
      <Footer />
    </div>
  );
}
