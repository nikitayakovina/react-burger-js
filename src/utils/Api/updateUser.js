import { getCookie } from '@utils/cookie.js';
import { request } from '@utils/request.js';

export const updateUser = (email, name, password) => {
  return request('/api/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify(email, password, name),
  });
};
