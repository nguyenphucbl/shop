import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { Input } from '~/components/Input';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { useForm } from 'react-hook-form';
import { registerUser } from '~/services/authService';
import { useState } from 'react';

const cx = classNames.bind(styles);
export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async data => {
    const { name, email, password } = data;
    const avatar = 'https://picsum.photos/800';

    setIsLoading(true);
    await registerUser({ name, email, password, avatar })
      .then(res => {
        if (!res) return;
        alert('User registered successfully!');
        navigate(config.routes.login);
      })
      .catch(() => {
        alert('Error registering user');
      })
      .finally(() => {
        setIsLoading(false);
      });

    reset();
  };
  const watchErrors = type => {
    if (errors[type]) {
      return errors[type].message;
    }
  };
  return (
    <div className={cx('row', 'text-center', 'container')}>
      <div className={cx('wrapper')}>
        <div className={cx('col-12')}>
          <div className={cx('header')}>SIGN UP</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              className={cx('input', { error: errors.name })}
              label='Name'
              id='name'
              type='text'
              placeholder='Enter Your Name'
              {...register('name', { required: true })}
            />
            <div className={cx('error-field')}>{watchErrors('name')}</div>
            <Input
              label='Email'
              id='email'
              type='email'
              placeholder='Enter Your Email'
              className={cx('input')}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[^@]+@[^@]+\.[^@]+/,
                  message: 'Invalid email',
                },
              })}
            />
            <div className={cx('error-field')}>{watchErrors('email')}</div>
            <Input
              label='Password'
              id='password'
              type='password'
              placeholder='Enter Your Password'
              className={cx('input')}
              {...register('password', { required: true, minLength: 6 })}
            />
            <div className={cx('error-field')}>{watchErrors('password')}</div>
            <Input
              label='Confirm Password'
              id='confirmPassword'
              type='password'
              placeholder='Confirm Password'
              className={cx('input')}
              {...register('confirmPassword', {
                required: true,
                validate: value => value === watch('password') || 'Passwords do not match',
              })}
            />
            <div className={cx('error-field')}>{watchErrors('confirmPassword')}</div>
            <div className={cx('left')}>
              <Link to={config.routes.login} className={cx('link')}>
                Already have an account? Login
              </Link>
            </div>
            <button
              disabled={isLoading ? true : false}
              type='submit'
              className={cx('btn', 'btn-primary', 'button')}
            >
              {isLoading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
