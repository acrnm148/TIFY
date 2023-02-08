import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const TOKEN_TIME_OUT = 60 * 60 * 1000;
const today = new Date();
const expireDate = new Date(today.getTime() + 2 * 60 * 60 * 1000);

export const setRefreshToken = (refreshToken: string) => {
  const today = new Date();
  // const expireDate = today.setDate(today.getDate() + 14);

  return cookies.set('refresh_token', refreshToken, {
    sameSite: 'strict',
    path: '/',
    expires: expireDate,
    // httpOnly: true,
  });
};

export const getCookieToken = () => {
  return cookies.get('refresh_token');
};

export const removeCookieToken = () => {
  return cookies.remove('refresh_token', { sameSite: 'strict', path: '/' });
};
