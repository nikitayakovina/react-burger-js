import { API_URL } from '@/config/apiConfig.js';

export const IngredientsApi = () => {
  const ENDPOINT = '/api/ingredients';

  return fetch(`${API_URL}${ENDPOINT}`)
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }

      return Promise.reject(res.status);
    })
    .catch((error) => console.error(error));
};
