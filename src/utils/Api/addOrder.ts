import { request } from '@utils/request.ts';

import type { TIngredient } from '@/models/ingredient';

export const addOrder = (ingredients: TIngredient[]) => {
  return request('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  });
};
