import { request } from '@utils/request.ts';

import type { TRegistration } from '@/models/user.ts';

export const registerUser = (email: string, password: string, name: string) => {
  return request<TRegistration>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name }),
  });
};
