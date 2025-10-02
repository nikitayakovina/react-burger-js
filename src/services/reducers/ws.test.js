import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_GET_ORDERS,
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_GET_ORDERS,
} from '../actions/ws';

import { wsReducer } from './ws';

const mockOrders = [
  {
    _id: 'order1',
    status: 'done',
    number: 123,
    name: 'Test Order 1',
    ingredients: ['id1', 'id2'],
    updatedAt: '2023-01-01T00:00:00Z',
  },
];

const mockPayload = {
  orders: mockOrders,
  total: 100,
  totalToday: 10,
};

const mockEvent = new Event('error');

describe('wsReducer', () => {
  const initialState = {
    wsConnected: false,
    wsError: undefined,
    wsProfileConnected: false,
    wsProfileError: undefined,
    orders: [],
    profileOrders: [],
    total: 0,
    totalToday: 0,
  };

  it('should return the initial state', () => {
    const result = wsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle WS_CONNECTION_START', () => {
    const result = wsReducer(initialState, { type: WS_CONNECTION_START });
    expect(result.wsConnected).toBe(false);
    expect(result.wsError).toBeUndefined();
  });

  it('should handle WS_CONNECTION_SUCCESS', () => {
    const result = wsReducer(initialState, { type: WS_CONNECTION_SUCCESS });
    expect(result.wsConnected).toBe(true);
    expect(result.wsError).toBeUndefined();
  });

  it('should handle WS_CONNECTION_ERROR', () => {
    const result = wsReducer(initialState, {
      type: WS_CONNECTION_ERROR,
      payload: mockEvent,
    });
    expect(result.wsConnected).toBe(false);
    expect(result.wsError).toEqual(mockEvent);
  });

  it('should handle WS_CONNECTION_CLOSED', () => {
    const result = wsReducer(
      { ...initialState, wsConnected: true },
      { type: WS_CONNECTION_CLOSED }
    );
    expect(result.wsConnected).toBe(false);
  });

  it('should handle WS_GET_ORDERS', () => {
    const result = wsReducer(initialState, {
      type: WS_GET_ORDERS,
      payload: mockPayload,
    });
    expect(result.orders).toEqual(mockOrders);
    expect(result.total).toBe(100);
    expect(result.totalToday).toBe(10);
    expect(result.wsConnected).toBe(true);
  });

  it('should handle WS_PROFILE_CONNECTION_START', () => {
    const result = wsReducer(initialState, {
      type: WS_PROFILE_CONNECTION_START,
    });
    expect(result.wsProfileConnected).toBe(false);
    expect(result.wsProfileError).toBeUndefined();
  });

  it('should handle WS_PROFILE_CONNECTION_SUCCESS', () => {
    const result = wsReducer(initialState, {
      type: WS_PROFILE_CONNECTION_SUCCESS,
    });
    expect(result.wsProfileConnected).toBe(true);
    expect(result.wsProfileError).toBeUndefined();
  });

  it('should handle WS_PROFILE_CONNECTION_ERROR', () => {
    const result = wsReducer(initialState, {
      type: WS_PROFILE_CONNECTION_ERROR,
      payload: mockEvent,
    });
    expect(result.wsProfileConnected).toBe(false);
    expect(result.wsProfileError).toEqual(mockEvent);
  });

  it('should handle WS_PROFILE_CONNECTION_CLOSED', () => {
    const result = wsReducer(
      {
        ...initialState,
        wsProfileConnected: true,
        profileOrders: mockOrders,
        total: 50,
        totalToday: 5,
      },
      { type: WS_PROFILE_CONNECTION_CLOSED }
    );
    expect(result.wsProfileConnected).toBe(false);
    expect(result.profileOrders).toEqual([]);
    expect(result.total).toBe(0);
    expect(result.totalToday).toBe(0);
    expect(result.wsProfileError).toBeUndefined();
  });

  it('should handle WS_PROFILE_GET_ORDERS', () => {
    const result = wsReducer(initialState, {
      type: WS_PROFILE_GET_ORDERS,
      payload: mockPayload,
    });
    expect(result.profileOrders).toEqual(mockOrders);
    expect(result.total).toBe(100);
    expect(result.totalToday).toBe(10);
    expect(result.wsProfileConnected).toBe(true);
    expect(result.wsProfileError).toBeUndefined();
  });
});
