import { request } from '@utils/request.js';

export const logoutUser = () => {
  return request('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });
};
