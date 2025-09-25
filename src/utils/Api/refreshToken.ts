import { request } from '@utils/request.ts';

import type { TToken } from '@/models/token.ts';

export const refreshToken = () => {
  return request<TToken>('/api/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  });
};
