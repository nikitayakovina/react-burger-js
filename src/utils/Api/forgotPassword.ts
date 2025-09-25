import { request } from '@utils/request.js';

import type { TPasswordReset } from '@/models/password-reset.ts';

export const forgotPassword = (email: string) => {
  return request<TPasswordReset>('/api/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
};
