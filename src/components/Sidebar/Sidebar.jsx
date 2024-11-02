import { Search } from '../Search';
import ProductFilter from './ProductFilter';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
export default function Sidebar() {
  return (
    <div>
      <Search />
      <ProductFilter />
    </div>
  );
}
