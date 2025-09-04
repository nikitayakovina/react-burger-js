import { request } from '@utils/request.ts';

export const registerUser = (email: string, password: string, name: string) => {
  return request('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
};
