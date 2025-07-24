import {
  FETCH_INGREDIENTS_START,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
} from '../actions/ingredients';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_START:
      return { ...state, loading: true, error: null };
    case FETCH_INGREDIENTS_SUCCESS:
      return { ...state, loading: false, items: action.data };
    case FETCH_INGREDIENTS_FAILURE:
      return { ...state, loading: false, error: action.data, items: initialState.items };
    default:
      return state;
  }
};
