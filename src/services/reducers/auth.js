import {
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

const initialState = {
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case LOGOUT_SUCCESS:
    case REGISTER_SUCCESS:
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
    default:
      return state;
  }
};
