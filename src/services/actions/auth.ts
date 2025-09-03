import { getUser } from '@utils/Api/getUser.ts';
import { getCookie } from '@utils/cookie.ts';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const checkUserAuth = () => {
  return async (dispatch) => {
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
