import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setFilter } from '~/stores/slices/productSlice';
import styles from './Search.module.scss';
const cx = classNames.bind(styles);
export default function Search() {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { filter } = useSelector(state => state.products);
  const dispatch = useDispatch();

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
