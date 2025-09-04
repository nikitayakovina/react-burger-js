import { SET_TAB } from '../actions/tabs.js';

type TInitialState = {
  tab: 'bun' | 'main' | 'sauce';
};

const initialState: TInitialState = {
  tab: 'bun',
};

export const tabsReducer = (state = initialState, action): TInitialState => {
  switch (action.type) {
    case SET_TAB:
      return { ...state, tab: action.tab };
    default:
      return state;
  }
};
