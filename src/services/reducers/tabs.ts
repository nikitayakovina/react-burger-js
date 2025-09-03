import { SET_TAB } from '../actions/tabs.js';

type TInitialState = {
  tab: 'bun' | 'main';
};

const initialState: TInitialState = {
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
