import { request } from '@utils/request.ts';

export const resetPassword = (token: string, password: string) => {
  return request('/api/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password }),
  });
};
