import { useAppDispatch } from '@/hooks/dispatch';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { checkUserAuth } from '../../services/actions/auth.js';
import { fetchIngredients } from '../../services/actions/ingredients.js';
import { AppHeader } from '@components/app-header/app-header';
import { FeedDetail } from '@components/feed-detail/feed-detail.tsx';
import { Modal } from '@components/modal/modal.js';
import { FeedPage } from '@pages/feed-page/feed-page.tsx';
import { ForgotPasswordPage } from '@pages/forgot-password-page/forgot-password-page.js';
import { HomePage } from '@pages/home-page/home-page.js';
import { IngredientPage } from '@pages/ingredient-page/ingredient-page.js';
import { LoginPage } from '@pages/login-page/login-page.js';
import { NotFoundPage } from '@pages/not-found-page/not-found-page.js';
import { ProfileLogoutPage } from '@pages/profile-logout-page/profile-logout-page.js';
import { ProfileOrdersPage } from '@pages/profile-orders-page/profile-orders-page.js';
import { ProfilePage } from '@pages/profile-page/profile-page.js';
import { ProfileSettingsPage } from '@pages/profile-settings-page/profile-settings-page.js';
import { RegistrationPage } from '@pages/registration-page/registration-page.js';
import { ResetPasswordPage } from '@pages/reset-password-page/reset-password-page';
import { OnlyAuth, OnlyUnAuth } from '@utils/protectedRoute.js';

import styles from './app.module.css';

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.backgroundLocation;

  useEffect(() => {
    void dispatch(fetchIngredients());
    void dispatch(checkUserAuth());
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
          <Route path="/profile/orders/:number" element={<FeedDetail />} />
          <Route path="/profile/logout" element={<ProfileLogoutPage />} />
        </Route>
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:number" element={<FeedDetail />} />
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
          <Route
            path="/feed/:number"
            element={
              <Modal header="Детали заказа" onClose={() => navigate(-1)}>
                <FeedDetail isModal={true} />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:number"
            element={
              <Modal header="Детали заказа" onClose={() => navigate(-1)}>
                <FeedDetail isModal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};
