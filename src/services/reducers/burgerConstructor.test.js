import { burgerConstructorReducer, initialState } from './burgerConstructor.js';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  CLEAR_INGREDIENT,
  REMOVE_INGREDIENT,
  SORT_INGREDIENT,
} from '../actions/burgerConstructor.js';

const bun = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  type: 'bun',
  __v: 0,
  _id: '643d69a5c3f7b9001cfa093c',
};

const ingredient = {
  calories: 30,
  carbohydrates: 10,
  fat: 5,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  name: 'Соус Spicy-X',
  price: 90,
  proteins: 20,
  type: 'sauce',
  __v: 0,
  _id: '643d69a5c3f7b9001cfa0941',
  uniqueId: '12345',
};

describe('burgerConstructorReducer', () => {
  it('should return the initial state', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle ADD_INGREDIENT', () => {
    const action = {
      type: ADD_INGREDIENT,
      item: ingredient,
    };
    const state = burgerConstructorReducer(undefined, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(ingredient);
  });

  it('should handle REMOVE_INGREDIENT', () => {
    const action = {
      type: REMOVE_INGREDIENT,
      index: 0,
    };
    const initialStateWithIngredient = {
      ...initialState,
      ingredients: [ingredient],
    };
    const state = burgerConstructorReducer(initialStateWithIngredient, action);
    expect(state.ingredients).toHaveLength(0);
  });

  it('should handle ADD_BUN', () => {
    const action = {
      type: ADD_BUN,
      item: bun,
    };
    const state = burgerConstructorReducer(undefined, action);
    expect(state.bun).toEqual(bun);
  });

  it('should handle SORT_INGREDIENT', () => {
    const ingredient1 = { ...ingredient, uniqueId: 'id1' };
    const ingredient2 = { ...ingredient, uniqueId: 'id2' };
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2],
    };
    const action = {
      type: SORT_INGREDIENT,
      fromIndex: 0,
      toIndex: 1,
    };
    const state = burgerConstructorReducer(initialStateWithIngredients, action);
    expect(state.ingredients[0]).toEqual(ingredient2);
    expect(state.ingredients[1]).toEqual(ingredient1);
  });

  it('should handle CLEAR_INGREDIENT', () => {
    const initialStateWithBurger = {
      ...initialState,
      bun: bun,
      ingredients: [ingredient],
    };
    const action = {
      type: CLEAR_INGREDIENT,
    };
    const state = burgerConstructorReducer(initialStateWithBurger, action);
    expect(state).toEqual(initialState);
  });
});
