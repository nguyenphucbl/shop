import images from '~/assets/images';
import classNames from 'classnames/bind';
import styles from './Image.module.scss';
const cx = classNames.bind(styles);
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};
function Image({ src, alt, className, fallback = images.imageError, ...props }, ref) {
  const [fallbackSrc, setFallbackSrc] = useState('');
  const onError = () => {
    setFallbackSrc(fallback);
  };
  const classes = cx('image', className);

  return (
    <img
      src={fallbackSrc || src}
      alt={alt}
      className={classes}
      {...props}
      ref={ref}
      onError={onError}
    />
  );
}

export default forwardRef(Image);
