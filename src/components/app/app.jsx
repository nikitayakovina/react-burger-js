import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { fetchIngredients } from '../../services/actions/ingredients.js';
import { AppHeader } from '@components/app-header/app-header';
import { ForgotPasswordPage } from '@pages/forgot-password-page/forgot-password-page.jsx';
import { IngredientPage } from '@pages/ingredient-page/ingredient-page.jsx';
import { LoginPage } from '@pages/login-page/login-page.jsx';
import { MainPage } from '@pages/main-page/main-page.jsx';
import { ProfileLogoutPage } from '@pages/profile-logout-page/profile-logout-page.jsx';
import { ProfileOrdersPage } from '@pages/profile-orders-page/profile-orders-page.jsx';
import { ProfilePage } from '@pages/profile-page/profile-page.jsx';
import { ProfileSettingsPage } from '@pages/profile-settings-page/profile-settings-page.jsx';
import { RegistrationPage } from '@pages/registration-page/registration-page.jsx';
import { ResetPasswordPage } from '@pages/reset-password-page/reset-password-page.jsx';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="/profile" element={<ProfilePage />}>
          <Route index element={<ProfileSettingsPage />} />
          <Route path="/profile/orders" element={<ProfileOrdersPage />} />
          <Route path="/profile/logout" element={<ProfileLogoutPage />} />
        </Route>
      </Routes>
    </div>
  );
};
