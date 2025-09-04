import { apiUrl } from '@/config/apiConfig.js';

import { checkResponse } from '@utils/checkResponse.js';

export const request = <TResponse>(
  endpoint: string,
  options?: RequestInit
): Promise<TResponse> => {
  return fetch(`${apiUrl}${endpoint}`, options).then(checkResponse);
};
