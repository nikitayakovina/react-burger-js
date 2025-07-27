import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_ERROR,
  CLEAR_ORDER,
} from '../actions/order';

const initialState = {
  order: null,
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case ADD_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.number };
    case ADD_ORDER_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ORDER:
      return initialState;
    default:
      return state;
  }
};
