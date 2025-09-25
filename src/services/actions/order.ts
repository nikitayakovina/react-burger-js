import { addOrder } from '@utils/Api/addOrder.ts';
import { fetchOrder } from '@utils/Api/fetchOrder.ts';

import type { TIngredient } from '@/models/ingredient.ts';
import type { TCreateOrder, TOrder } from '@/models/order.ts';
import type { ThunkAction } from 'redux-thunk';

import type { TIngredientsActions } from '../../services/actions/ingredients.ts';
import type { AppDispatch, RootState } from '../../services/store.ts';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST' as const;
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS' as const;
export const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR' as const;
export const CLEAR_ORDER = 'CLEAR_ORDER' as const;
export const FETCH_ORDER_REQUEST = 'FETCH_ORDER_REQUEST' as const;
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS' as const;
export const FETCH_ORDER_ERROR = 'FETCH_ORDER_ERROR' as const;

export type IAddOrderRequestAction = {
  readonly type: typeof ADD_ORDER_REQUEST;
};

export type IAddOrderSuccessAction = {
  readonly type: typeof ADD_ORDER_SUCCESS;
  readonly order: TCreateOrder;
};

export type IAddOrderErrorAction = {
  readonly type: typeof ADD_ORDER_ERROR;
  readonly payload: string;
};

export type IClearOrderAction = {
  readonly type: typeof CLEAR_ORDER;
};

export type IFetchOrderRequestAction = {
  readonly type: typeof FETCH_ORDER_REQUEST;
};

export type IFetchOrderSuccessAction = {
  readonly type: typeof FETCH_ORDER_SUCCESS;
  readonly order: TOrder;
};

export type IFetchOrderErrorAction = {
  readonly type: typeof FETCH_ORDER_ERROR;
  readonly payload: string;
};

export type TOrderActions =
  | IAddOrderRequestAction
  | IAddOrderSuccessAction
  | IAddOrderErrorAction
  | IClearOrderAction
  | IFetchOrderRequestAction
  | IFetchOrderSuccessAction
  | IFetchOrderErrorAction;

export const sendOrder = (ingredients: TIngredient[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: ADD_ORDER_REQUEST });
    try {
      addOrder(ingredients).then((res) =>
        dispatch({ type: ADD_ORDER_SUCCESS, order: res.order })
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: ADD_ORDER_ERROR, payload: error.message });
      }
    }
  };
};

export const fetchOrderAction = (
  id: string | number
): ThunkAction<Promise<void>, RootState, unknown, TIngredientsActions> => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_ORDER_REQUEST });
    try {
      const response = await fetchOrder(id);

      dispatch({ type: FETCH_ORDER_SUCCESS, order: response.orders?.[0] });
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch({ type: FETCH_ORDER_ERROR, payload: error.message });
      }
    }
  };
};

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});
