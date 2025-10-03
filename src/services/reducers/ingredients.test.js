import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_ERROR,
} from '../actions/ingredients';

import { ingredientsReducer, initialState } from './ingredients';

describe('ingredientsReducer', () => {
  const ingredients = [
    {
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
    },
    {
      _id: '643d69a5c3f7b9001cfa0947',
      name: 'Плоды Фалленианского дерева',
      type: 'main',
      proteins: 20,
      fat: 5,
      carbohydrates: 55,
      calories: 77,
      price: 874,
      image: 'https://code.s3.yandex.net/react/code/sp_1.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
      __v: 0,
      uniqueId: '1234567',
    },
  ];

  it('should return the initial state', () => {
    const result = ingredientsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle FETCH_INGREDIENTS_REQUEST', () => {
    const action = { type: FETCH_INGREDIENTS_REQUEST };
    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('should handle FETCH_INGREDIENTS_SUCCESS', () => {
    const action = {
      type: FETCH_INGREDIENTS_SUCCESS,
      data: ingredients,
    };
    const result = ingredientsReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      items: ingredients,
    });
  });

  it('should handle FETCH_INGREDIENTS_ERROR', () => {
    const action = {
      type: FETCH_INGREDIENTS_ERROR,
      payload: 'ERROR',
    };

    const loadingState = {
      ...initialState,
      loading: true,
    };

    const result = ingredientsReducer(loadingState, action);
    expect(result).toEqual({
      ...initialState,
      loading: false,
      error: 'ERROR',
      items: [],
    });
  });
});
