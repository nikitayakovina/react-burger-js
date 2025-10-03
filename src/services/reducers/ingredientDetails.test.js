import { ingredientDetailsReducer } from './ingredientDetails';
import {
  SET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
} from '../actions/ingredientDetails';

describe('ingredientDetailsReducer', () => {
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

  it('should return the initial state', () => {
    const result = ingredientDetailsReducer(undefined, { type: '' });
    expect(result).toEqual({ ingredient: null });
  });

  it('should handle SET_INGREDIENT_DETAILS', () => {
    const action = {
      type: SET_INGREDIENT_DETAILS,
      ingredient,
    };
    const result = ingredientDetailsReducer(undefined, action);
    expect(result).toEqual({ ingredient });
  });

  it('should handle CLEAR_INGREDIENT_DETAILS', () => {
    const initialState = { ingredient };
    const action = { type: CLEAR_INGREDIENT_DETAILS };
    const result = ingredientDetailsReducer(initialState, action);
    expect(result).toEqual({ ingredient: null });
  });
});
