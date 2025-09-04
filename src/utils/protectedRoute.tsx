import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import type { TOnlyUnAuthProps, TProtectedRouteProps } from '@/models/protected-route';
import type { FC } from 'react';

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  component,
}) => {
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((state) => state.auth);
  const isResetPassword = JSON.parse(localStorage.getItem('resetPassword'));

  if (location.pathname.endsWith('/reset-password') && !isResetPassword && !user) {
    return <Navigate to="/forgot-password" />;
  }

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };

    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyUnAuth: FC<TOnlyUnAuthProps> = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
export const OnlyAuth = ProtectedRoute;
