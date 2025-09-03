import { Link } from 'react-router-dom';

import type { FC } from 'react';

import styles from './not-found-page.module.css';

export const NotFoundPage: FC = () => {
  return (
    <section className={`${styles.notFoundPage}`}>
      <h1>Ошибка 404</h1>
      <Link to="/">
        <span>Перейти на главную страницу</span>
      </Link>
    </section>
  );
};
