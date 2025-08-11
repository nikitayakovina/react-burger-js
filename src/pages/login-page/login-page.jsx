import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import styles from './login-page.module.css';

export const LoginPage = () => {
  return (
    <section className={`${styles.loginPage} mb-10`}>
      <form>
        <div className={`${styles.header} text text_type_main-medium mb-6`}>Вход</div>
        <main className={`${styles.content}`}>
          <EmailInput extraClass="mb-6" name="email" />
          <PasswordInput extraClass="mb-6" name="password" />
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
