import styles from './Button.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
export default function Button({
  children,
  className,
  to,
  href,
  onClick,
  disabled,
  primary,
  size = 'md',
  ...passProps
}) {
  let Comp = 'button';
  const _props = {
    onClick,
    ...passProps,
  };
  if (disabled) {
    Object.keys(_props).forEach(key => {
      if (typeof _props[key] === 'function') {
        _props[key] = () => {};
      }
    });
  }
  if (to) {
    _props.to = to;
    Comp = Link;
  } else if (href) {
    _props.href = href;
    Comp = 'a';
  }
  const classes = cx('wrapper', {
    primary,
    disabled,
    [size]: size,
    [className]: className,
  });
  return (
    <Comp className={classes} {..._props}>
      {children}
    </Comp>
  );
}
