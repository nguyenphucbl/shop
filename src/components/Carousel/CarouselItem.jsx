import classNames from 'classnames/bind';
import styles from './Carousel.module.scss';
import { Button } from '../Button';
const cx = classNames.bind(styles);
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
CarouselItem.propTypes = {
  data: PropTypes.object,
};
export default function CarouselItem({ data = [] }) {
  const { images, description, price, title, id } = data;
  const navigate = useNavigate();
  const handleLearnMore = id => {
    navigate(`/product/${id}`);
  };
  return (
    <div className={cx('cart-item')}>
      <img src={images[0]} alt='product' className={cx('product-image')} />
      <h4 className={cx('title')}>{title}</h4>
      <p className={cx('description')}>{description}</p>
      <div className={cx('info')}>
        <span className={cx('price')}>${price}</span>
        <Button onClick={() => handleLearnMore(id)} primary className={cx('button')}>
          Learn More Now!
        </Button>
      </div>
    </div>
  );
}
