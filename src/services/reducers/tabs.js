import { SET_TAB } from '../actions/tabs.js';

const initialState = {
  tab: 'bun',
};

export const tabsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAB:
      return { ...state, tab: action.tab };
    default:
      return state;
  }
};
