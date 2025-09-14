import { getUser } from '@utils/Api/getUser.ts';
import { getCookie } from '@utils/cookie.ts';

import type { TUser } from '@/models/user.ts';

import type { AppDispatch } from '@services/store.ts';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS' as const;
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE' as const;
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS' as const;
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE' as const;
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS' as const;
export const REGISTER_FAILURE = 'REGISTER_FAILURE' as const;
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS' as const;
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS' as const;
export const GET_USER_FAILURE = 'GET_USER_FAILURE' as const;

export type TAuthAction =
  | { type: typeof LOGIN_SUCCESS; user: TUser }
  | { type: typeof LOGIN_FAILURE; payload: string }
  | { type: typeof LOGOUT_SUCCESS; user: null }
  | { type: typeof LOGOUT_FAILURE; payload: string }
  | { type: typeof REFRESH_TOKEN_SUCCESS }
  | { type: typeof REFRESH_TOKEN_FAILURE; payload: string }
  | { type: typeof REGISTER_SUCCESS; user: TUser }
  | { type: typeof REGISTER_FAILURE; payload: string }
  | { type: typeof UPDATE_USER_SUCCESS; user: TUser }
  | { type: typeof GET_USER_SUCCESS; user: TUser; payload: string }
  | { type: typeof GET_USER_FAILURE; payload: string };

export const checkUserAuth = () => {
  return async (dispatch: AppDispatch) => {
    try {
      if (getCookie('accessToken')) {
        getUser()
          .then((res) => {
            dispatch({ type: GET_USER_SUCCESS, user: res.user });
          })
          .catch((error) => dispatch({ type: GET_USER_FAILURE, error: error.message }));
      } else {
        dispatch({ type: GET_USER_SUCCESS });
      }
    } catch (e) {
      console.error(e);
    }
  };
};
