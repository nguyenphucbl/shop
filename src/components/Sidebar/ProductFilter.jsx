import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);
export default function ProductFilter() {
  const items = ['All', 'Sweater', 'Shoes', 'Miscellaneous', 'Clothes'];
  return (
    <div className={cx('product-filter')}>
      <ul className={cx('list-category')}>
        {items.map(item => (
          <li key={item} className={cx('item-cate')}>
            <a href='' className={cx('item-link')}>
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
