import { loadIngredients } from '@utils/Api/loadIngredients.ts';

import type { TIngredient } from '@/models/ingredient.ts';
import type { ThunkAction } from 'redux-thunk';

import type { AppDispatch, RootState } from '@services/store.ts';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST' as const;
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS' as const;
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR' as const;

export type IFetchIngredientsRequestAction = {
  readonly type: typeof FETCH_INGREDIENTS_REQUEST;
};

export type IFetchIngredientsSuccessAction = {
  readonly type: typeof FETCH_INGREDIENTS_SUCCESS;
  readonly data: TIngredient[];
};

export type IFetchIngredientsErrorAction = {
  readonly type: typeof FETCH_INGREDIENTS_ERROR;
  readonly payload: string;
};

export const fetchIngredientsRequest = (): IFetchIngredientsRequestAction => ({
  type: FETCH_INGREDIENTS_REQUEST,
});

export const fetchIngredientsSuccess = (
  data: TIngredient[]
): IFetchIngredientsSuccessAction => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  data,
});

export const fetchIngredientsError = (
  payload: string
): IFetchIngredientsErrorAction => ({
  type: FETCH_INGREDIENTS_ERROR,
  payload,
});

export type TIngredientsActions =
  | IFetchIngredientsRequestAction
  | IFetchIngredientsSuccessAction
  | IFetchIngredientsErrorAction;

export const fetchIngredients = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  TIngredientsActions
> => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchIngredientsRequest());
    try {
      const response = await loadIngredients();
      dispatch(fetchIngredientsSuccess(response.data));
    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(fetchIngredientsError(error.message));
      }
    }
  };
};
