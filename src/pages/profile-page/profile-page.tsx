import { useAppDispatch } from '@/hooks/dispatch';
import { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { LOGOUT_FAILURE, LOGOUT_SUCCESS } from '../../services/actions/auth.js';
import { fetchWithRequest } from '@utils/Api/fetchWithRequest.js';
import { logoutUser } from '@utils/Api/logoutUser.js';
import { deleteCookie } from '@utils/cookie.ts';

import type { FC } from 'react';
import type React from 'react';

import styles from './profile-page.module.css';

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWithRequest().then();
  }, [dispatch]);

  const handleLogOut = (e: React.MouseEvent<HTMLLIElement>) => {
    e.preventDefault();

    logoutUser()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch({ type: LOGOUT_SUCCESS });
        navigate('/login', { replace: true });
      })
      .catch((error) => {
        dispatch({ type: LOGOUT_FAILURE, payload: error.message });
      });
  };

  return (
    <main className={`${styles.profileContainer} pt-30`}>
      <nav className={`${styles.profileWrapper} mr-15`}>
        <ul className={`${styles.list}`}>
          <li className={styles.listItem}>
            <NavLink to="" end>
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
                >
                  Профиль
                </span>
              )}
            </NavLink>
          </li>
          <li className={styles.listItem}>
            <NavLink to={'/profile/orders'}>
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
                >
                  История заказов
                </span>
              )}
            </NavLink>
          </li>
          <li className={styles.listItem} onClick={handleLogOut}>
            <NavLink to={'/profile/logout'}>
              {({ isActive }) => (
                <span
                  className={`text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`}
                >
                  Выход
                </span>
              )}
            </NavLink>
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
