import type { TIngredient } from '@/models/ingredient.ts';

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS' as const;
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS' as const;

export type ISetIngredientDetailsAction = {
  readonly type: typeof SET_INGREDIENT_DETAILS;
  readonly ingredient: TIngredient;
};

export type IClearIngredientDetailsAction = {
  readonly type: typeof CLEAR_INGREDIENT_DETAILS;
};

export type TIngredientDetailsActions =
  | ISetIngredientDetailsAction
  | IClearIngredientDetailsAction;
