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

import type { TWSOrder } from '@/models/order.ts';

import type { TWSActionTypes, TWSProfileActions } from '../actions/ws';

type TWSState = {
  wsConnected: boolean;
  wsError?: Event;
  wsProfileConnected: boolean;
  wsProfileError?: Event;
  orders: TWSOrder[];
  profileOrders: TWSOrder[];
  total: number;
  totalToday: number;
};

const initialState: TWSState = {
  wsConnected: false,
  wsError: undefined,
  wsProfileConnected: false,
  wsProfileError: undefined,
  orders: [],
  profileOrders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (
  state = initialState,
  action: TWSActionTypes | TWSProfileActions
) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnected: false,
        wsError: undefined,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: undefined,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsError: action.payload,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_ORDERS: {
      return {
        ...state,
        wsConnected: true,
        wsError: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }

    case WS_PROFILE_CONNECTION_START:
      return {
        ...state,
        wsProfileConnected: false,
        wsProfileError: undefined,
      };

    case WS_PROFILE_CONNECTION_SUCCESS:
      return {
        ...state,
        wsProfileConnected: true,
        wsProfileError: undefined,
      };

    case WS_PROFILE_CONNECTION_ERROR:
      return {
        ...state,
        wsProfileConnected: false,
        wsProfileError: action.payload,
      };

    case WS_PROFILE_CONNECTION_CLOSED:
      return {
        ...state,
        wsProfileConnected: false,
        wsProfileError: undefined,
        profileOrders: [],
        total: 0,
        totalToday: 0,
      };

    case WS_PROFILE_GET_ORDERS:
      return {
        ...state,
        wsProfileConnected: true,
        wsProfileError: undefined,
        profileOrders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
