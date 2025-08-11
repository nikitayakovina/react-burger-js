import { Outlet } from 'react-router-dom';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
  return (
    <main className={`${styles.profileContainer} pt-30`}>
      <nav className={`${styles.profileWrapper} mr-15`}>
        <ul className={`${styles.list}`}>
          <li className={styles.listItem}>
            <span className={`text text_type_main-medium text_color_primary`}>
              Профиль
            </span>
          </li>
          <li className={styles.listItem}>
            <span className={`text text_type_main-medium text_color_inactive`}>
              История заказов
            </span>
          </li>
          <li className={styles.listItem}>
            <span className={`text text_type_main-medium text_color_inactive`}>
              Выход
            </span>
          </li>
        </ul>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <Outlet />
    </main>
  );
};
