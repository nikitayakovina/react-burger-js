import { addOrder } from '@utils/Api/addOrder.ts';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_ERROR = 'ADD_ORDER_ERROR';
export const CLEAR_ORDER = 'CLEAR_ORDER';

export const sendOrder = (ingredients) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ORDER_REQUEST });
    try {
      addOrder(ingredients).then((res) =>
        dispatch({ type: ADD_ORDER_SUCCESS, number: res.order.number })
      );
    } catch (error) {
      dispatch({ type: ADD_ORDER_ERROR, payload: error.message });
    }
  };
};

export const clearOrder = () => ({
  type: CLEAR_ORDER,
});
