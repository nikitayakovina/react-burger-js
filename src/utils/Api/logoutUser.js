import { request } from '@utils/request.js';

export const logoutUser = (token) => {
  return request('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });
};
