import {
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_ERROR,
} from '../actions/ingredients';

import type { TIngredient } from '@/models/ingredient';

type TInitialState = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TInitialState = {
  items: [],
  loading: false,
  error: null,
};

export const ingredientsReducer = (state = initialState, action): TInitialState => {
  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_INGREDIENTS_SUCCESS:
      return { ...state, loading: false, items: action.data };
    case FETCH_INGREDIENTS_ERROR:
      return { ...state, loading: false, error: action.data, items: initialState.items };
    default:
      return state;
  }
};
