import styles from './Search.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
export default function Search() {
  return (
    <div className={cx('search')}>
      <form className={cx('submit-search')}>
        <input type='text' placeholder='Search...' className={cx('input')} />
        <button type='submit' className={cx('button')}>
          Search
        </button>
      </form>
    </div>
  );
}
