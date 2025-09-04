import { refreshToken } from '@utils/Api/refreshToken.js';
import { getCookie, setCookie } from '@utils/cookie.ts';
import { request } from '@utils/request.ts';

export const fetchWithRequest = async () => {
  const makeRequest = async () => {
    return request('/api/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('accessToken'),
      },
    });
  };

  try {
    return await makeRequest();
  } catch (error) {
    if (error.message === 'jwt expired') {
      const token = await refreshToken();

      localStorage.setItem('refreshToken', token.refreshToken);
      setCookie('accessToken', token.accessToken.split('Bearer ')[1]);

      return await makeRequest();
    } else {
      return Promise.reject(error);
    }
  }
};
