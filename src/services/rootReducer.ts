import { combineReducers } from 'redux';

import { authReducer } from './reducers/auth';
import { burgerConstructorReducer } from './reducers/burgerConstructor';
import { ingredientDetailsReducer } from './reducers/ingredientDetails';
import { ingredientsReducer } from './reducers/ingredients';
import { orderReducer } from './reducers/order';
import { tabsReducer } from './reducers/tabs';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  tabs: tabsReducer,
  auth: authReducer,
});
