import { useAppDispatch } from '@/hooks/dispatch';
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { LOGIN_FAILURE, LOGIN_SUCCESS } from '../../services/actions/auth.js';
import { loginUser } from '@utils/Api/loginUser.js';
import { setCookie } from '@utils/cookie.js';

import type { ChangeEvent, FormEvent } from 'react';

import styles from './login-page.module.css';

export const LoginPage = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser(formData.email, formData.password)
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
        <div className={`text text_type_main-medium mb-6`}>Вход</div>
        <main>
          <EmailInput
            extraClass="mb-6"
            name="email"
            onChange={handleChange}
            value={formData.email || ''}
          />
          <PasswordInput
            extraClass="mb-6"
            name="password"
            onChange={handleChange}
            value={formData.password || ''}
          />
          <Button type="primary" extraClass="mb-20" htmlType="submit">
            Войти
          </Button>
        </main>
        <div>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вы — новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
          </p>
        </div>
      </form>
    </section>
  );
};
