import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../storage/Cookie';
// import { requestToken } from '../api/Users';
import { DELETE_TOKEN, SET_TOKEN } from '../store/Auth';
import axios from 'axios';

export function CheckToken(key: string) {
  const [isAuth, setIsAuth] = useState('Loaded');
  // const { authenticated, expireTime } = useSelector((state) => state.token);
  const refreshToken = getCookieToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthToken = async () => {
      // 리프레쉬 토큰이 없다면
      if (refreshToken === undefined) {
        // access 토큰 없애고, 인증 여부를 Failed로 한다.
        dispatch(DELETE_TOKEN());
        setIsAuth('Failed');
        // 리프레쉬 토큰 있으면
      } else {
        // 인증 확인
        if (authenticated && new Date().getTime() < expireTime) {
          setIsAuth('Success');
        } else {
          const response = await requestToken(refreshToken);

          if (response.status) {
            const token = response.json.access_token;
            dispatch(SET_TOKEN(token));
            setIsAuth('Success');
          } else {
            dispatch(DELETE_TOKEN());
            removeCookieToken();
            setIsAuth('Failed');
          }
        }
      }
    };
    checkAuthToken();
  }, [refreshToken, dispatch, key]);

  return {
    isAuth,
  };
}

// export const requestToken = async (refreshToken: string) => {
//   try {
//     return await axios
//       .post('https://i8e208.p.ssafy.io/api/account/login', {})
//       .then((res) => {
//         console.log(res);
//         console.log(res.data.accessToken);
//         const tokens = {
//           access_token: res.data.accessToken,
//           refresh_token: res.data.refreshToken,
//         };
//         console.log(tokens);
//         return tokens;
//         // console.log(res.accessToken);
//       });
//   } catch (err) {
//     console.log(err);
//     console.log('Errrrrrr');
//   }

//   const option = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//     },
//     body: JSON.stringify({ refresh_token: refreshToken }),
//   };

//   const data = await getPromise('/user/login', option).catch(() => {
//     return statusError;
//   });

//   if (parseInt(Number(data.status) / 100) === 2) {
//     const status = data.ok;
//     const code = data.status;
//     const text = await data.text();
//     const json = text.length ? JSON.parse(text) : '';

//     return {
//       status,
//       code,
//       json,
//     };
//   } else {
//     return statusError;
//   }
// };
