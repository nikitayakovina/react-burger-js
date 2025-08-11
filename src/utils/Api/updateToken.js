import { request } from '@utils/request.js';

export const updateToken = (token) => {
  return request('/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
};
