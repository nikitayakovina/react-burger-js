import { Link } from 'react-router-dom';

import styles from './not-found-page.module.css';

export const NotFoundPage = () => {
  return (
    <section className={`${styles.notFoundPage}`}>
      <h1>Ошибка 404</h1>
      <Link to="/">
        <span>Перейти на главную страницу</span>
      </Link>
    </section>
  );
};
