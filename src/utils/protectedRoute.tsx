import { useAppSelector } from '@/hooks/selector.ts';
import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Navigate, useLocation } from 'react-router-dom';

import type { TOnlyUnAuthProps, TProtectedRouteProps } from '@/models/protected-route';

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component,
}: TProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);
  const isResetPassword = JSON.parse(localStorage.getItem('resetPassword') as string);

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

export const OnlyUnAuth = ({ component }: TOnlyUnAuthProps) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
export const OnlyAuth = ProtectedRoute;
