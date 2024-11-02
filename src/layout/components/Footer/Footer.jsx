import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
const cx = classNames.bind(styles);
export default function Footer() {
  return (
    <footer className={cx('footer')}>
      <div className={cx('container-md', 'container')}>
        <div className={cx('row')}>
          <div className={cx('col-lg-12', 'content')}>
            <p className={cx('text')}>
              &copy; {new Date().getFullYear()}
              <a href='https://www.creative-tim.com' target='_blank'>
                Creative Tim
              </a>
              , made with love for a better web
            </p>
            <a href=''>
              <FontAwesomeIcon icon={faGithub} className={cx('icon')} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
