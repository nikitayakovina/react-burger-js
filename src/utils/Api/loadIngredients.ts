import { request } from '@utils/request.ts';

export const loadIngredients = () => {
  return request('/api/ingredients');
};
