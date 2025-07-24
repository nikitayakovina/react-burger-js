import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  SORT_INGREDIENT,
  CLEAR_INGREDIENT,
} from '../actions/burgerConstructor.js';

const initialState = {
  bun: null,
  ingredients: [],
  amount: 0,
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, ingredients: [...state.ingredients, action.item] };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient._id !== action.id
        ),
      };
    case ADD_BUN:
      return { ...state, bun: action.item };
    case SORT_INGREDIENT: {
      const ingredients = [...state.ingredients];
      ingredients.splice(action.toIndex, 0, ...ingredients.splice(action.fromIndex, 1));

      return {
        ...state,
        ingredients,
      };
    }
    case CLEAR_INGREDIENT:
      return initialState;
    default:
      return state;
  }
};
