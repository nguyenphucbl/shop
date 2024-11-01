import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import { Button } from '../Button';
const cx = classNames.bind(styles);
import PropTypes from 'prop-types';
CarouselItem.propTypes = {
  data: PropTypes.object,
};
export default function CarouselItem({ data = [] }) {
  const { image, name } = data;

  return (
    <div className={cx('cart-item')}>
      <div
        className={cx('info')}
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className={cx('name')}>
          <p className={cx('description')}>CATEGORY:</p>
          <h4 className={cx('title')}>{name}</h4>
        </div>
        <Button size='sm' className={cx('button')}>
          Go to Store
        </Button>
      </div>
    </div>
  );
}
