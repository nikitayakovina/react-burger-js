import { SET_TAB } from '../actions/tabs.js';
import { tabsReducer, initialState } from './tabs';

describe('tabsReducer', () => {
  it('should return the initial state', () => {
    const result = tabsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle SET_TAB with "main"', () => {
    const result = tabsReducer(initialState, {
      type: SET_TAB,
      tab: 'main',
    });
    expect(result).toEqual({ tab: 'main' });
  });

  it('should handle SET_TAB with "sauce"', () => {
    const result = tabsReducer(initialState, {
      type: SET_TAB,
      tab: 'sauce',
    });
    expect(result).toEqual({ tab: 'sauce' });
  });

  it('should handle SET_TAB with "bun"', () => {
    const customState = { tab: 'main' };
    const result = tabsReducer(customState, {
      type: SET_TAB,
      tab: 'bun',
    });
    expect(result).toEqual({ tab: 'bun' });
  });
});
