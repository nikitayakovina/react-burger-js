import { getCookie } from '@utils/cookie.ts';
import { request } from '@utils/request.ts';

import type { TIngredient } from '@/models/ingredient';
import type { TCreateOrder } from '@/models/order.ts';

export const addOrder = (ingredients: TIngredient[]) => {
  return request<TCreateOrder>('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify({ ingredients }),
  });
};
