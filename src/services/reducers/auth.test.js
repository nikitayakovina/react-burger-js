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

import { authReducer, initialState } from './auth';

describe('authReducer', () => {
  const mockUser = {
    name: 'Yakovina Nikita',
    email: 'nikita@yakovina.ru',
  };

  const mockError = 'ERROR';

  it('should return the initial state', () => {
    const result = authReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const result = authReducer(initialState, {
      type: LOGIN_SUCCESS,
      user: mockUser,
    });
    expect(result).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true,
      error: null,
    });
  });

  it('should handle REGISTER_SUCCESS', () => {
    const result = authReducer(initialState, {
      type: REGISTER_SUCCESS,
      user: mockUser,
    });
    expect(result).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true,
      error: null,
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    const result = authReducer(
      { ...initialState, user: mockUser },
      {
        type: LOGOUT_SUCCESS,
        user: null,
      }
    );
    expect(result).toEqual({
      ...initialState,
      user: null,
      isAuthChecked: true,
      error: null,
    });
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    const updatedUser = { name: 'Yakovina Nikita', email: 'nikita@yakovina.ru' };
    const result = authReducer(
      { ...initialState, user: mockUser },
      {
        type: UPDATE_USER_SUCCESS,
        user: updatedUser,
      }
    );
    expect(result).toEqual({
      ...initialState,
      user: updatedUser,
      error: null,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const result = authReducer(
      { ...initialState, user: mockUser },
      {
        type: LOGIN_FAILURE,
        payload: mockError,
      }
    );
    expect(result).toEqual({
      ...initialState,
      user: null,
      error: mockError,
    });
  });

  it('should handle REGISTER_FAILURE', () => {
    const result = authReducer(
      { ...initialState, user: mockUser },
      {
        type: REGISTER_FAILURE,
        payload: mockError,
      }
    );
    expect(result).toEqual({
      ...initialState,
      user: null,
      error: mockError,
    });
  });

  it('should handle LOGOUT_FAILURE', () => {
    const result = authReducer(
      { ...initialState, user: mockUser },
      {
        type: LOGOUT_FAILURE,
        payload: mockError,
      }
    );
    expect(result).toEqual({
      ...initialState,
      user: null,
      error: mockError,
    });
  });

  it('should handle REFRESH_TOKEN_SUCCESS', () => {
    const result = authReducer(
      { ...initialState, error: mockError },
      {
        type: REFRESH_TOKEN_SUCCESS,
      }
    );
    expect(result).toEqual({
      ...initialState,
      error: null,
    });
  });

  it('should handle REFRESH_TOKEN_FAILURE', () => {
    const result = authReducer(
      { ...initialState, user: mockUser },
      {
        type: REFRESH_TOKEN_FAILURE,
        payload: mockError,
      }
    );
    expect(result).toEqual({
      ...initialState,
      user: null,
      error: mockError,
    });
  });

  it('should handle GET_USER_SUCCESS', () => {
    const result = authReducer(initialState, {
      type: GET_USER_SUCCESS,
      user: mockUser,
      payload: null,
    });
    expect(result).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: mockUser,
      error: null,
    });
  });

  it('should handle GET_USER_FAILURE', () => {
    const result = authReducer(initialState, {
      type: GET_USER_FAILURE,
      payload: mockError,
    });
    expect(result).toEqual({
      ...initialState,
      isAuthChecked: true,
      user: null,
      error: mockError,
    });
  });
});
