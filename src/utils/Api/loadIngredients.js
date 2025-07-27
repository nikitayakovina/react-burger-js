import { request } from '@utils/request.js';

export const loadIngredients = () => {
  return request('/api/ingredients');
};
