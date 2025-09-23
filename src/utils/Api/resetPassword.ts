import { request } from '@utils/request.ts';

import type { TPasswordResetReset } from '@/models/password-reset.ts';

export const resetPassword = (token: string, password: string) => {
  return request<TPasswordResetReset>('/api/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password }),
  });
};
