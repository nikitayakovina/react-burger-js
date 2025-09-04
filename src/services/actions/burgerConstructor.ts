import { v4 as uuid } from 'uuid';

import type { TIngredient } from '@/models/ingredient';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';
export const SORT_INGREDIENT = 'SORT_INGREDIENT';
export const CLEAR_INGREDIENT = 'CLEAR_INGREDIENT';

export const addIngredient = (item: TIngredient) => {
  return {
    type: ADD_INGREDIENT,
    item: {
      ...item,
      uniqueId: uuid(),
    },
  };
};
