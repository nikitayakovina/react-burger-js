import { request } from '@utils/request.ts';

import type { TIngredient } from '@/models/ingredient.ts';

export const loadIngredients = () => {
  return request<{ data: TIngredient[] }>('/api/ingredients');
};
