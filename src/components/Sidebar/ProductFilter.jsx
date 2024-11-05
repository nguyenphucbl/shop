import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '~/stores/middlewares/productMiddleware';
import { setFilter } from '~/stores/slices/productSlice';
const cx = classNames.bind(styles);
export default function ProductFilter() {
  const categories = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Clothes' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Furniture' },
    { id: 4, name: 'Shoes' },
    { id: 5, name: 'Others' },
  ];
  const [active, setActive] = useState('All');
  const { filter } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  //NOTE: phải dùng Object.fromEntries để chuyển đổi URLSearchParams thành object thì mới set được nhiều params

  const params = Object.fromEntries(searchParams);
  const handleClick = item => {
    setActive(item.name);
    // if (item === 'All') {
    //   searchParams.delete('categoryId');
    //   setSearchParams(searchParams);
    // } else {
    //   setSearchParams({ categoryId: item.id });
    // }
    if (item.name === 'All') {
      searchParams.delete('categoryId');
      setSearchParams(searchParams);
      dispatch(setFilter({ ...filter, categoryId: null }));
    } else {
      setSearchParams({ ...params, categoryId: item.id });
      dispatch(setFilter({ ...filter, categoryId: item.id }));
    }
  };

  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams);
  //   dispatch(getProduct(params));
  // }, [searchParams, dispatch]);
  return (
    <div className={cx('product-filter')}>
      <ul className={cx('list-category')}>
        {categories.map(item => (
          <li key={item.id} className={cx('item-cate')}>
            <span
              onClick={() => handleClick(item)}
              className={cx('item-link', { active: active === item.name })}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
