import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { checkUserAuth } from '../../services/actions/auth.js';
import { fetchIngredients } from '../../services/actions/ingredients.js';
import { AppHeader } from '@components/app-header/app-header';
import { Modal } from '@components/modal/modal.jsx';
import { ForgotPasswordPage } from '@pages/forgot-password-page/forgot-password-page.jsx';
import { HomePage } from '@pages/home-page/home-page.jsx';
import { IngredientPage } from '@pages/ingredient-page/ingredient-page.jsx';
import { LoginPage } from '@pages/login-page/login-page.jsx';
import { NotFoundPage } from '@pages/not-found-page/not-found-page.jsx';
import { ProfileLogoutPage } from '@pages/profile-logout-page/profile-logout-page.jsx';
import { ProfileOrdersPage } from '@pages/profile-orders-page/profile-orders-page.jsx';
import { ProfilePage } from '@pages/profile-page/profile-page.jsx';
import { ProfileSettingsPage } from '@pages/profile-settings-page/profile-settings-page.jsx';
import { RegistrationPage } from '@pages/registration-page/registration-page.jsx';
import { ResetPasswordPage } from '@pages/reset-password-page/reset-password-page.jsx';
import { OnlyAuth, OnlyUnAuth } from '@utils/protectedRoute.jsx';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<RegistrationPage />} />}
        />
        <Route
          path="/forgot-password"
          element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
        />
        <Route
          path="/reset-password"
          element={<OnlyUnAuth component={<ResetPasswordPage />} />}
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
          <Route index element={<ProfileSettingsPage />} />
          <Route path="/profile/orders" element={<ProfileOrdersPage />} />
          <Route path="/profile/logout" element={<ProfileLogoutPage />} />
        </Route>
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal header="Детали ингридиента" onClose={() => navigate(-1)}>
                <IngredientPage />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
