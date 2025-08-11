import { request } from '@utils/request.js';

export const resetPassword = (token, password) => {
  return request('/api/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, token }),
  });
};
