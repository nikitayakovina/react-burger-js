import { v4 as uuid } from 'uuid';

import type { TIngredient } from '@/models/ingredient';

export const ADD_INGREDIENT = 'ADD_INGREDIENT' as const;
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT' as const;
export const ADD_BUN = 'ADD_BUN' as const;
export const SORT_INGREDIENT = 'SORT_INGREDIENT' as const;
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT' as const;

export type IAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  readonly item: TIngredient;
};

export type IRemoveIngredientAction = {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly index: number;
};

export type IAddBunAction = {
  readonly type: typeof ADD_BUN;
  readonly item: TIngredient;
};

export type ISortIngredientAction = {
  readonly type: typeof SORT_INGREDIENT;
  readonly fromIndex: number;
  readonly toIndex: number;
};

export type IClearIngredientAction = {
  readonly type: typeof CLEAR_INGREDIENT;
};

export type TBurgerConstructorActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IAddBunAction
  | ISortIngredientAction
  | IClearIngredientAction;

export const addIngredient = (item: TIngredient) => {
  return {
    type: ADD_INGREDIENT,
    item: {
      ...item,
      uniqueId: uuid(),
    },
  };
};
