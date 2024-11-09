import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Image } from '~/components';
import { Button } from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { reduceQuantity, removeFromCart, addQuantity } from '~/stores/slices/cartSlice';
const cx = classNames.bind(styles);
export default function Cart() {
  const { cart, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const removeItem = id => {
    dispatch(removeFromCart(id));
  };

  const handleReduceQuantity = id => {
    dispatch(reduceQuantity(id));
  };
  const handleAddQuantity = id => {
    dispatch(addQuantity(id));
  };

  return (
    <div className={cx('shopping-cart')}>
      <div className={cx('row')}>
        <div className={cx('col-12')}>
          <p className={cx('header')}>Shopping Cart</p>
          <div className={cx('body')}>
            <div className={cx('row')}>
              {cart.length > 0 ? (
                <>
                  {cart.map(item => {
                    return (
                      <div className={cx('box-product')} key={item.id}>
                        <div className={cx('col-2')}>
                          <Image
                            src={item.images[0]}
                            alt='product'
                            className={cx('product-image')}
                          />
                        </div>
                        <div className={cx('col-10', 'product')}>
                          <div className={cx('info')}>
                            <p className={cx('product-name')}>{item.title}</p>
                            <p className={cx('product-price')}>${item.price}</p>
                          </div>
                          <div className={cx('quantity')}>
                            <Button
                              primary
                              onClick={() => removeItem(item.id)}
                              className={cx('remove-button')}
                            >
                              Remove
                            </Button>
                            <button
                              onClick={() => handleReduceQuantity(item.id)}
                              className={cx('quantity-button')}
                              // disabled={item.quantity === 1}
                            >
                              -
                            </button>
                            <input
                              type='text'
                              className={cx('quantity-input')}
                              value={item.quantity}
                            />
                            <button
                              onClick={() => handleAddQuantity(item.id)}
                              className={cx('quantity-button')}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <p className={cx('empty-cart')}>Your cart is empty</p>
              )}
            </div>
          </div>
          <div className={cx('footer')}>
            <p className={cx('total-label')}>Total:</p>
            <p className={cx('total')}>${total}</p>
            <Button primary className={cx('checkout-button')}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
