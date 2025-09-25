import { getCookie } from '@utils/cookie.ts';
import { request } from '@utils/request.ts';

import type { TUserAuth } from '@/models/user.ts';

export const updateUser = (email: string, name: string, password?: string) => {
  return request<TUserAuth>('/api/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify({ email, password, name }),
  });
};
