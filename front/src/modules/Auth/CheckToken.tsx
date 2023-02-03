import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router';
import { getCookieToken, removeCookieToken } from './Cookie';
// import { requestToken } from '../api/Users';
import {
  DELETE_TOKEN,
  RootState,
  SET_TOKEN,
  SET_USERID,
} from '../../store/Auth';
import axios from 'axios';

export function CheckTokenByKey(key: string) {
  const [isAuth, setIsAuth] = useState('Loaded');
  const { authenticated, expireTime } = useSelector(
    (state: RootState) => state.authToken,
  );
  const refreshToken = getCookieToken();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  console.log(
    authenticated,
    expireTime,
    'authenticated, expireTime 이렇습니다!!!',
  );

  useEffect(() => {
    const checkAuthToken = async () => {
      // 리프레쉬 토큰이 없다면
      if (refreshToken === undefined) {
        // access 토큰 없애고, 인증 여부를 Failed로 한다.
        dispatch(DELETE_TOKEN());
        setIsAuth('Failed');
        console.log('리프레쉬토큰 없는 녀석');
        // return navigate('/');
        // 리프레쉬 토큰 있으면
      } else {
        // 인증 여부 및 기간 만료 확인
        if (authenticated && new Date().getTime() < expireTime) {
          console.log('아직 쓸만한 access token');
          setIsAuth('Success');
        } else {
          // access코드 이상하면 리프레쉬 토큰으로 리프레쉬 시도
          console.log('리프레쉬 시도');
          const response = await requestToken(refreshToken);

          if (response) {
            // const token = response.json.access_token;
            // dispatch(SET_USERID(token));
            // dispatch(SET_TOKEN(token));
            console.log('리프레쉬 성공');
            setIsAuth('Success');
          } else {
            dispatch(DELETE_TOKEN());
            removeCookieToken();
            setIsAuth('Failed');
            console.log('리프레쉬 실패');
            alert('로그아웃 되셨습니다.');
            // return navigate('/');
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

// export function CheckToken() {
//   const [isAuth, setIsAuth] = useState('Loaded');
//   const { authenticated, expireTime } = useSelector(
//     (state: RootState) => state.authToken,
//   );
//   const refreshToken = getCookieToken();
//   console.log(refreshToken, '이게 리프레쉬 토큰!!!!!!');
//   const dispatch = useDispatch();
//   // const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthToken = () => {
//       // 리프레쉬 토큰이 없다면
//       if (refreshToken === undefined) {
//         // access 토큰 없애고, 인증 여부를 Failed로 한다.
//         dispatch(DELETE_TOKEN());
//         setIsAuth('Failed');
//         console.log('리프레쉬토큰 없는 녀석');
//         // return navigate('/');
//         // 리프레쉬 토큰 있으면
//       } else {
//         // 인증 여부 및 기간 만료 확인
//         if (authenticated && new Date().getTime() < expireTime) {
//           console.log('아직 쓸만한 access token');
//           setIsAuth('Success');
//         } else {
//           // access코드 이상하면 리프레쉬 토큰으로 리프레쉬 시도
//           const response = await requestToken(refreshToken);

//           if (response) {
//             // const token = response.json.access_token;
//             // dispatch(SET_USERID(token));
//             // dispatch(SET_TOKEN(token));
//             console.log('리프레쉬 성공');
//             setIsAuth('Success');
//           } else {
//             dispatch(DELETE_TOKEN());
//             removeCookieToken();
//             setIsAuth('Failed');
//             console.log('리프레쉬 실패');
//             alert('로그아웃 되셨습니다.');
//             // return navigate('/');
//           }
//         }
//       }
//     };
//     // checkAuthToken();
//   }, [dispatch]);

//   return {
//     isAuth,
//   };
// }

async function requestToken(refreshToken: string) {
  const { userId } = useSelector((state: RootState) => state.authToken.userId);
  const dispatch = useDispatch();

  console.log('리프레쉬 요청 보내보기');

  try {
    axios
      .post(
        `https://i8e208.p.ssafy.io/api/refresh/${userId}`,
        {},
        // 헤더에 리프레쉬 토큰 얹어서 보내야 함.
        { headers: { refreshToken } },
      )
      .then((res) => {
        console.log('리프레쉬 요청한 거 받음');
        console.log(res);
        // console.log(res);
        // console.log(res.data.accessToken);
        // const tokens = {
        //   access_token: res.data.accessToken,
        //   refresh_token: res.data.refreshToken,
        // };
        // console.log(tokens);
        // return tokens;
        // console.log(res.accessToken);

        // 재발급 성공
        // 리프레쉬 토큰 재설정하기

        return true;
      });
  } catch (err) {
    console.log(err);
    console.log('Errrrrrr');
    return false;
  }

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
}
