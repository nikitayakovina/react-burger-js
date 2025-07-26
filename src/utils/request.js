import { apiUrl } from '@/config/apiConfig.js';

import { checkResponse } from '@utils/checkResponse.js';

export const request = (endpoint, options) => {
  return fetch(`${apiUrl}${endpoint}`, options).then(checkResponse);
};
