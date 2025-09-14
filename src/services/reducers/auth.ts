import {
  GET_USER_FAILURE,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  REFRESH_TOKEN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from '../actions/auth.js';

import type { TUser } from '@/models/user';

import type { TAuthAction } from '../actions/auth.js';

type TInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  user: null,
  isAuthChecked: false,
  error: null,
};

export const authReducer = (
  state = initialState,
  action: TAuthAction
): TInitialState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuthChecked: true,
        error: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null,
      };
    case LOGOUT_FAILURE:
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case REFRESH_TOKEN_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isAuthChecked: true,
        user: action.user,
        error: action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        isAuthChecked: true,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
