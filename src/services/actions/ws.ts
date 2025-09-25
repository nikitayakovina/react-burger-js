import type { TWSOrder } from '@/models/order.ts';

export const WS_CONNECTION_START = 'WS_CONNECTION_START' as const;
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS' as const;
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR' as const;
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED' as const;
export const WS_GET_ORDERS = 'WS_GET_ORDERS' as const;
export const WS_PROFILE_CONNECTION_START = 'WS_PROFILE_CONNECTION_START' as const;
export const WS_PROFILE_CONNECTION_SUCCESS = 'WS_PROFILE_CONNECTION_SUCCESS' as const;
export const WS_PROFILE_CONNECTION_ERROR = 'WS_PROFILE_CONNECTION_ERROR' as const;
export const WS_PROFILE_CONNECTION_CLOSED = 'WS_PROFILE_CONNECTION_CLOSED' as const;
export const WS_PROFILE_GET_ORDERS = 'WS_PROFILE_GET_ORDERS' as const;

export type TWSActions = {
  wsInit: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

type TWSConnectionStartAction = {
  readonly type: typeof WS_CONNECTION_START;
  payload: string;
};

type TWSConnectionSuccessAction = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  payload: string;
};

type TWSConnectionErrorAction = {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: string;
};

type TWSConnectionClosedAction = {
  readonly type: typeof WS_CONNECTION_CLOSED;
  payload?: string;
};

type TWSProfileConnectionStartAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_START;
  payload: string;
};

type TWSProfileConnectionSuccessAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS;
  payload: string;
};

type TWSProfileConnectionErrorAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_ERROR;
  payload: string;
};

type TWSProfileConnectionClosedAction = {
  readonly type: typeof WS_PROFILE_CONNECTION_CLOSED;
  payload?: string;
};

type TWSProfileGetOrdersAction = {
  readonly type: typeof WS_PROFILE_GET_ORDERS;
  payload: {
    success?: boolean;
    orders: TWSOrder[];
    total: number;
    totalToday: number;
  };
};

type TWSGetOrdersAction = {
  readonly type: typeof WS_GET_ORDERS;
  payload: {
    success?: boolean;
    orders: TWSOrder[];
    total: number;
    totalToday: number;
  };
};

export type TWSActionTypes =
  | TWSConnectionStartAction
  | TWSConnectionSuccessAction
  | TWSConnectionErrorAction
  | TWSConnectionClosedAction
  | TWSGetOrdersAction;

export type TWSProfileActions =
  | TWSProfileConnectionStartAction
  | TWSProfileConnectionSuccessAction
  | TWSProfileConnectionErrorAction
  | TWSProfileConnectionClosedAction
  | TWSProfileGetOrdersAction;

export const wsActions: TWSActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

export const wsProfileActions: TWSActions = {
  wsInit: WS_PROFILE_CONNECTION_START,
  onOpen: WS_PROFILE_CONNECTION_SUCCESS,
  onClose: WS_PROFILE_CONNECTION_CLOSED,
  onError: WS_PROFILE_CONNECTION_ERROR,
  onMessage: WS_PROFILE_GET_ORDERS,
};
