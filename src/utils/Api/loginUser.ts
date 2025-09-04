import { request } from '@utils/request.ts';

export const loginUser = (email: string, password: string) => {
  return request('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};
