import { addOrder } from '@utils/Api/addOrder.js';

export const ADD_ORDER_START = 'ADD_ORDER_START';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const sendOrder = (ingredients) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ORDER_START });
    try {
      addOrder(ingredients).then((res) =>
        dispatch({ type: ADD_ORDER_SUCCESS, number: res.order.number })
      );
    } catch (error) {
      dispatch({ type: ADD_ORDER_FAILURE, payload: error.message });
    }
  };
};

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});
