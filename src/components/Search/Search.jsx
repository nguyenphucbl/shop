import { useEffect, useState } from 'react';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '~/stores/middlewares/productMiddleware';
import { setFilter } from '~/stores/slices/productSlice';
const cx = classNames.bind(styles);
export default function Search() {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter } = useSelector(state => state.products);
  console.log('🚀 ~ Search ~ filter:', filter);
  const dispatch = useDispatch();
  const params = Object.fromEntries(searchParams);

  const handleChange = e => {
    setSearch(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      searchParams.delete('title');
      setSearchParams(searchParams);
      dispatch(setFilter({ ...filter, title: null }));
    } else {
      setSearchParams({ ...searchParams, title: search });
      dispatch(setFilter({ ...filter, title: search }));
    }
  };

  return (
    <div className={cx('search')}>
      <form className={cx('submit-search')} onSubmit={handleSubmit}>
        <input
          value={search}
          onChange={handleChange}
          type='text'
          placeholder='Search...'
          className={cx('input')}
        />
        <button type='submit' className={cx('button')}>
          Search
        </button>
      </form>
    </div>
  );
}
