import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { forgotPassword } from '@utils/Api/forgotPassword.js';

import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email)
      .then(() => {
        localStorage.setItem('resetPassword', JSON.stringify(true));
        navigate('/reset-password', { replace: true });
      })
      .catch((error) => console.error(error));
  };

  return (
    <section className={`${styles.forgotPasswordPage} mb-10`}>
      <form onSubmit={handleSubmit}>
        <div className={`text text_type_main-medium mb-6`}>Восстановление пароля</div>
        <main>
          <EmailInput
            extraClass="mb-6"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="primary" extraClass="mb-20" htmlType="submit">
            Восстановить
          </Button>
        </main>
        <div>
          <p className="text text_type_main-default text_color_inactive mb-4">
            Вспомнили пароль? <Link to={'/login'}>Войти</Link>
          </p>
        </div>
      </form>
    </section>
  );
};
