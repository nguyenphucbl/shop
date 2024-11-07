import PropTypes from 'prop-types';
import styles from './Input.module.scss';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
const cx = classNames.bind(styles);
Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string,
};
function Input({ id, type, placeholder, value, onChange, className, label, ...props }, ref) {
  const classes = cx('input', className);
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type || 'text'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classes}
        {...props}
        ref={ref}
      />
    </>
  );
}

export default forwardRef(Input);
