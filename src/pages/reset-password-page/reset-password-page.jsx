import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { resetPassword } from '@utils/Api/resetPassword.js';

import styles from './reset-password-page.module.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    resetPassword(token, password)
      .then((res) => {
        if (res.success) {
          navigate('/login', { replace: true });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <section className={`${styles.loginPage} mb-10`}>
      <form onSubmit={handleSubmit}>
        <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
        <main>
          <PasswordInput
            placeholder="Введите новый пароль"
            name="password"
            extraClass="mb-6"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Введите код из письма"
            name="token"
            extraClass="mb-6"
            onChange={(e) => setToken(e.target.value)}
          />
          <Button type="primary" extraClass="mb-20" htmlType="submit">
            Сохранить
          </Button>
        </main>
        <div>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вспомнили пароль?{' '}
            <Link className="page-link" to={'/login'}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};
