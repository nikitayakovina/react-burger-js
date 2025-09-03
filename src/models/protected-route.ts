export type TProtectedRouteProps = {
  component: JSX.Element;
  onlyUnAuth: boolean;
};

export type TOnlyUnAuthProps = Omit<TProtectedRouteProps, 'onlyUnAuth'>;
