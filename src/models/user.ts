export type TUser = {
  email: string;
  name: string;
};

export type TRegistration = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TUserAuth = Pick<TRegistration, 'success' | 'user'>;
