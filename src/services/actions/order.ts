import { addOrder } from '@utils/Api/addOrder.ts';

import type { TOrder } from '@/models/order.ts';

import type { AppDispatch } from '@services/store.ts';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST' as const;
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS' as const;
export const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR' as const;
export const CLEAR_ORDER = 'CLEAR_ORDER' as const;

export type IAddOrderRequestAction = {
  readonly type: typeof ADD_ORDER_REQUEST;
};

export type IAddOrderSuccessAction = {
  readonly type: typeof ADD_ORDER_SUCCESS;
  readonly order: TOrder;
};

export type IAddOrderErrorAction = {
  readonly type: typeof ADD_ORDER_ERROR;
  readonly payload: string;
};

export type IClearOrderAction = {
  readonly type: typeof CLEAR_ORDER;
};

export type TOrderActions =
  | IAddOrderRequestAction
  | IAddOrderSuccessAction
  | IAddOrderErrorAction
  | IClearOrderAction;

export const sendOrder = (ingredients) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ADD_ORDER_REQUEST });
    try {
      addOrder(ingredients).then((res) =>
        dispatch({ type: ADD_ORDER_SUCCESS, number: res.order.number })
      );
    } catch (error) {
      dispatch({ type: ADD_ORDER_ERROR, payload: error.message });
    }
  };
};

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});
