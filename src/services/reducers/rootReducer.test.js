import { createStore } from 'redux';
import { rootReducer } from '../rootReducer';
import { authReducer } from './auth';
import { ingredientsReducer } from './ingredients';
import { burgerConstructorReducer } from './burgerConstructor';
import { ingredientDetailsReducer } from './ingredientDetails';
import { orderReducer } from './order';
import { tabsReducer } from './tabs';
import { wsReducer } from './ws';
import { LOGIN_SUCCESS } from '../../services/actions/auth';

describe('rootReducer', () => {
  it('should initialize with correct default state from child reducers', () => {
    const store = createStore(rootReducer);

    const state = store.getState();

    expect(state.auth).toEqual(authReducer(undefined, { type: '' }));
    expect(state.ingredients).toEqual(ingredientsReducer(undefined, { type: '' }));
    expect(state.burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: '' })
    );
    expect(state.ingredientDetails).toEqual(
      ingredientDetailsReducer(undefined, { type: '' })
    );
    expect(state.order).toEqual(orderReducer(undefined, { type: '' }));
    expect(state.tabs).toEqual(tabsReducer(undefined, { type: '' }));
    expect(state.wsReducer).toEqual(wsReducer(undefined, { type: '' }));
  });

  it('should respond to dispatched actions correctly', () => {
    const store = createStore(rootReducer);

    const action = {
      type: LOGIN_SUCCESS,
      user: { email: 'test@example.com', name: 'Test User' },
    };

    store.dispatch(action);

    expect(store.getState().auth).toEqual(authReducer(undefined, action));
  });
});
