import { useEffect, useState } from 'react';
import { Button } from '../Button';
import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '~/stores/middlewares/productMiddleware';
import { Image } from '../Image';
import '~/assets/styles/pagination.less';

const cx = classNames.bind(styles);
export default function Product() {
  const { products, loading, filter } = useSelector(state => state.products);
  console.log('🚀 ~ Product ~ products:', products);

  const dispatch = useDispatch();
  useEffect(() => {
    const action = dispatch(getProduct(filter));
    return () => {
      action.abort();
    };
  }, [dispatch, filter]);
  return (
    <div className={cx('list-product')}>
      {loading ? (
        <div className='row justify-content-center'>
          <div className='spinner-border text-secondary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        </div>
      ) : (
        <div className='row'>
          {products.length > 1 ? (
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
          ) : (
            <div
              className={cx('no-product', 'd-flex', 'justify-content-center', 'align-items-center')}
            >
              <h1>No product found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
