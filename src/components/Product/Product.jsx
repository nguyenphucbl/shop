import { useEffect } from 'react';
import { Button } from '../Button';
import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '~/stores/middlewares/productMiddleware';
import { Image } from '../Image';

const cx = classNames.bind(styles);
export default function Product() {
  const { products, loading, filter } = useSelector(state => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const action = dispatch(getProduct());
    return () => {
      action.abort();
    };
  }, [dispatch]);
  return (
    <div className={cx('list-product')}>
      <div className='row'>
        {loading ? (
          <div className='spinner-border text-secondary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : (
          products.map(product => (
            <div className='col-4' key={product.id}>
              <div className={cx('product-item')}>
                <Image src={product.images[0]} alt='product' className={cx('product-img')} />
                <div className={cx('content')}>
                  <h3 className={cx('product-title')}>{product.title}</h3>
                  <p className={cx('product-desc')}>{product.description}</p>
                  <div className={cx('info')}>
                    <p className={cx('product-price')}>${product.price}</p>
                    <Button primary size='sm' className={cx('btn-add')}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}