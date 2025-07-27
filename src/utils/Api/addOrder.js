import { request } from '@utils/request.js';

export const addOrder = (ingredients) => {
  return request('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  });
};
