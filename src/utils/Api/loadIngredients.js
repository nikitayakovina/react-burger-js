import { apiUrl } from '@/config/apiConfig.js';

export const loadIngredients = () => {
  const endPoint = '/api/ingredients';

  return fetch(`${apiUrl}${endPoint}`)
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }

      return Promise.reject(res.status);
    })
    .catch((error) => console.error(error));
};
