import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
  CLEAR_ORDER,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_ERROR,
  FETCH_ORDER_REQUEST,
} from '../actions/order';

import { orderReducer, initialState } from './order';

describe('orderReducer', () => {
  const mockTCreateOrder = {
    name: 'Test Order',
    order: { number: 12345 },
    number: 12345,
    success: true,
  };

  const mockTOrder = {
    number: 12345,
  };

  const mockTWSOrder = {
    ingredients: ['id1', 'id2'],
    _id: 'order123',
    status: 'done',
    name: 'Test Order',
    number: 12345,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T01:00:00Z',
  };

  const mockError = 'ERROR';

  it('should return the initial state', () => {
    const result = orderReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle ADD_ORDER_REQUEST', () => {
    const result = orderReducer(initialState, { type: ADD_ORDER_REQUEST });
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle FETCH_ORDER_REQUEST', () => {
    const result = orderReducer(initialState, { type: FETCH_ORDER_REQUEST });
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle ADD_ORDER_SUCCESS', () => {
    const result = orderReducer(initialState, {
      type: ADD_ORDER_SUCCESS,
      order: mockTCreateOrder,
    });
    expect(result).toEqual({
      ...initialState,
      loading: false,
      order: mockTCreateOrder,
    });
  });

  it('should handle FETCH_ORDER_SUCCESS', () => {
    const result = orderReducer(initialState, {
      type: FETCH_ORDER_SUCCESS,
      order: mockTOrder,
    });
    expect(result).toEqual({
      ...initialState,
      loading: false,
      order: mockTOrder,
    });
  });

  it('should handle ADD_ORDER_ERROR', () => {
    const result = orderReducer(
      { ...initialState, loading: true },
      {
        type: ADD_ORDER_ERROR,
        payload: mockError,
      }
    );
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: mockError,
    });
  });

  it('should handle FETCH_ORDER_ERROR', () => {
    const result = orderReducer(
      { ...initialState, loading: true },
      {
        type: FETCH_ORDER_ERROR,
        payload: mockError,
      }
    );
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: mockError,
    });
  });

  it('should handle CLEAR_ORDER', () => {
    const filledState = {
      order: mockTOrder,
      createdOrder: mockTCreateOrder,
      fetchedOrder: { success: true, order: mockTWSOrder },
      loading: false,
      error: null,
    };
    const result = orderReducer(filledState, { type: CLEAR_ORDER });
    expect(result).toEqual(initialState);
  });
});
