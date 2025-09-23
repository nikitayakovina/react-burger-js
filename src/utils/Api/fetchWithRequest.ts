import { refreshToken } from '@utils/Api/refreshToken.js';
import { getCookie, setCookie } from '@utils/cookie.ts';
import { request } from '@utils/request.ts';

import type { TUserAuth } from '@/models/user.ts';

export const fetchWithRequest = async () => {
  const makeRequest = async () => {
    return request<TUserAuth>('/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    });
  };

  try {
    return await makeRequest();
  } catch (error: unknown) {
    if (error instanceof Error && error.message === 'jwt expired') {
      const token = await refreshToken();

      localStorage.setItem('refreshToken', token.refreshToken);
      setCookie('accessToken', token.accessToken.split('Bearer ')[1]);

      return await makeRequest();
    } else {
      return Promise.reject(error);
    }
  }
};
