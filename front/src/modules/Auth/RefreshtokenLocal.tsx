import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refresh_token', JSON.stringify({ refreshToken }));
};

export const getCookieToken = () => {
  return JSON.parse(localStorage.getItem('refresh_token') || '{}').refreshToken;
};

export const removeCookieToken = () => {
  return localStorage.removeItem('refresh_token');
  // return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};
