import { request } from '@utils/request.js';

export const forgotPassword = (email: string) => {
  return request('/api/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
};
