import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Input } from '~/components/Input';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from '~/stores/middlewares/authMiddleware';
import { useEffect, useState } from 'react';
import { login } from '~/services/authService';
import Cookies from 'js-cookie';

const cx = classNames.bind(styles);
export default function Login() {
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const formValues = watch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const onSubmit = async data => {
    setIsLoading(true);
    setError('');
    await login(data)
      .then(res => {
        if (!res) return;
        const { access_token, refresh_token } = res.data;
        Cookies.set('access_token', access_token);
        Cookies.set('refresh_token', refresh_token);
        dispatch(getProfileUser());

        navigate(-1, { replace: true });
      })
      .catch(error => {
        console.log(error);
        const errorMessage = 'Invalid email or password';
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={cx('row', 'text-center', 'container')}>
      <div className={cx('wrapper')}>
        <div className={cx('col-12')}>
          <div className={cx('header')}>LOGIN</div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Input
              label='Password'
              id='password'
              type='password'
              placeholder='Enter Your Password'
              className={cx('input')}
              {...register('password', { required: true, minLength: 6 })}
            />
            {error && <div className={cx('error-field')}>{error}</div>}

            <div className={cx('left')}>
              <Link to={config.routes.signup} className={cx('link')}>
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
            <button
              disabled={isLoading ? true : false}
              type='submit'
              className={cx('btn', 'btn-primary', 'button')}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
