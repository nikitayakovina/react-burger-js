import { request } from '@utils/request.js';

export const registerUser = (email, password, name) => {
  return request('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
};
