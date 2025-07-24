import { apiUrl } from '@/config/apiConfig.js';

export const addOrder = (ingredients) => {
  const endPoint = '/api/orders';

  return fetch(`${apiUrl}${endPoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients }),
  })
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }

      return Promise.reject(res.status);
    })
    .catch((error) => console.error(error));
};
