import { loadIngredients } from '@utils/Api/loadIngredients.js';

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_ERROR = 'FETCH_INGREDIENTS_ERROR';

export const fetchIngredients = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_REQUEST });
    try {
      const response = await loadIngredients();

      dispatch({ type: FETCH_INGREDIENTS_SUCCESS, data: response.data });
    } catch (e) {
      dispatch({ type: FETCH_INGREDIENTS_ERROR, data: e });
    }
  };
};
