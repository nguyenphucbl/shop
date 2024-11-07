import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Image } from '~/components';
import { Button } from '~/components/Button';
import { getProductDetail } from '~/stores/middlewares/productMiddleware';
import styles from './ProductDetail.module.scss';
const cx = classNames.bind(styles);
export default function ProductDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { id: productId } = useParams();
  const { productDetail, loading } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const handleNext = () => {
    const isLastSlide = activeIndex === productDetail.images.length - 1;
    const newIndex = isLastSlide ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };
  const handlePrev = () => {
    const isFirstSlide = activeIndex === 0;
    const newIndex = isFirstSlide ? productDetail.images.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };
  useEffect(() => {
    dispatch(getProductDetail(productId));
  }, [dispatch, productId]);
  if (loading) return <div>Loading...</div>;
  return (
    <div className={cx('wrapper')}>
      {
        <div className='row'>
          <div className={cx('col-6')}>
            <div className={cx('slider-wrapper')}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={cx('icon', 'left')}
                onClick={handlePrev}
              />
              {productDetail?.images.map((image, index) => (
                <Image
                  src={image}
                  key={index}
                  alt={productDetail.title}
                  className={cx('image', { 'image-active': activeIndex === index })}
                />
              ))}
              {/* {
                productDetail.images > 0 && (
                  <Image src={productDetail.images[activeIndex]} alt={productDetail.title} className={cx('image')} />
                )
              } */}
              <div className={cx('d-flex', 'slider')}>
                {productDetail?.images.map((_, index) => (
                  <span
                    className={cx('dot', activeIndex === index ? 'active' : '')}
                    key={index}
                    onClick={() => setActiveIndex(index)}
                  ></span>
                ))}
              </div>

              <FontAwesomeIcon
                icon={faChevronRight}
                className={cx('icon', 'right')}
                onClick={handleNext}
              />
            </div>
          </div>
          <div className={cx('col-6')}>
            <div className={cx('content')}>
              <div className={cx('title')}>{productDetail?.title}</div>
              <span className={cx('category')}>{productDetail?.category?.name}</span>
              <p className={cx('desc')}>{productDetail?.description}</p>
              <div className={cx('items-bottom')}>
                <p className={cx('price')}>${productDetail?.price}</p>
                <Button primary>Add to cart</Button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}
