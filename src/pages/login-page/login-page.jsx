import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../services/actions/auth.js';
import { loginUser } from '@utils/Api/loginUser.js';
import { setCookie } from '@utils/cookie.js';

import styles from './login-page.module.css';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password)
      .then((res) => {
        if (res.success) {
          const { accessToken, refreshToken } = {
            ...res,
            accessToken: res.accessToken.split('Bearer ')[1],
          };

          if (accessToken) {
            setCookie('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          }

          dispatch({ type: LOGIN_SUCCESS, user: res.user });
        }
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAILURE, error });
      });
  };

  return (
    <section className={`${styles.loginPage} mb-10`}>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.header} text text_type_main-medium mb-6`}>Вход</div>
        <main className={`${styles.content}`}>
          <EmailInput
            extraClass="mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            extraClass="mb-6"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="primary" extraClass="mb-20" htmlType="submit">
            Войти
          </Button>
        </main>
        <div className={`${styles.footer}`}>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вы — новый пользователь?{' '}
            <Link className="page-link" to={'/register'}>
              Зарегистрироваться
            </Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{' '}
            <Link className="page-link" to={'/forgot-password'}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
