import { request } from '@utils/request.js';

export const updateUser = (email, password, name) => {
  return request('/api/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
};
