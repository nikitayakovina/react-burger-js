import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
  CLEAR_ORDER,
  FETCH_ORDER_SUCCESS,
} from '../actions/order';

import type { TCreateOrder, TFetchOrderNumber, TOrder } from '@/models/order';

import type { TOrderActions } from '../actions/order';

type TInitialState = {
  order: TOrder | null;
  createdOrder: TCreateOrder | null;
  fetchedOrder: TFetchOrderNumber | null;
  loading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  order: null,
  createdOrder: null,
  fetchedOrder: null,
  loading: false,
  error: null,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TInitialState => {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ORDER_SUCCESS:
    case FETCH_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.order };
    case ADD_ORDER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ORDER:
      return initialState;
    default:
      return state;
  }
};
