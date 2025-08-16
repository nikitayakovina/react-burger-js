import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { REGISTER_FAILURE, REGISTER_SUCCESS } from '../../services/actions/auth.js';
import { registerUser } from '@utils/Api/registerUser.js';
import { setCookie } from '@utils/cookie.js';

import styles from './registration-page.module.css';

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(formData)
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

          dispatch({ type: REGISTER_SUCCESS, user: res.user });
        }
      })
      .catch((error) => {
        dispatch({ type: REGISTER_FAILURE, error });
      });
  };
  return (
    <section className={`${styles.loginPage} mb-10`}>
      <form onSubmit={handleSubmit}>
        <div className={`text text_type_main-medium mb-6`}>Регистрация</div>
        <main>
          <Input
            placeholder="Имя"
            extraClass="mb-6"
            name="name"
            onChange={handleChange}
            value={formData.name || ''}
          />
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
            Зарегистрироваться
          </Button>
        </main>
        <div>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Уже зарегистрированы?{' '}
            <Link className="page-link" to={'/login'}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
