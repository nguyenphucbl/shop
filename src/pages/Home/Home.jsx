import Carousel from '~/components/Carousel';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Category from '~/components/Category';
const cx = classNames.bind(styles);
export default function Home() {
  return (
    <div className={cx('wrapper')}>
      <Carousel />
      <Category />
    </div>
  );
}
