import { request } from '@utils/request.ts';

import type { TRegistration } from '@/models/user.ts';

export const loginUser = (email: string, password: string) => {
  return request<TRegistration>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
};
