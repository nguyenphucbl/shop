import { Product, Sidebar } from '~/components';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
const cx = classNames.bind(styles);
export default function Products() {
  return (
    <div className={cx('product', 'container')}>
      <div className='row'>
        <div className='col-3'>
          <Sidebar />
        </div>
        <div className='col-9'>
          <Product />
        </div>
      </div>
    </div>
  );
}
