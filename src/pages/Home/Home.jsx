import Carousel from '~/components/Carousel';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);
export default function Home() {
  return (
    <div className={cx('wrapper')}>
      <Carousel />
    </div>
  );
}
