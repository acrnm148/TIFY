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
  SET_USEREMAIL,
} from '../../store/Auth';
import axios from 'axios';
import { setRefreshToken } from './Cookie';

type TokenType = {
  access_token: string;
  refresh_token: string;
  user_email: string;
  user_id: number;
};

export function CheckTokenByKey(key: string) {
  const [isAuth, setIsAuth] = useState('Loaded');
  const { authenticated, expireTime } = useSelector(
    (state: RootState) => state.authToken,
  );
  const refreshToken = getCookieToken();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // console.log(
  //   authenticated,
  //   expireTime,
  //   'authenticated, expireTime 이렇습니다!!!',
  // );
  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );

  // const { userId } = useSelector((state: RootState) => state.authToken.userId);
  // console.log(userId, 'userId는 이렇습니다!!');

  // console.log(refreshToken, 'refreshToken은 이렇습니다!!!');

  function LogOutAPI(accessToken: string) {
    axios({
      url: 'https://i8e208.p.ssafy.io/api/account/logout',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
    })
      .then((con) => {
        console.log('로그아웃 성공', con);
      })
      .catch((err) => {
        console.log('로그아웃 실패', err);
      });
  }

  const checkAuthToken = async () => {
    // 리프레쉬 토큰이 없다면
    if (refreshToken === undefined) {
      // access 토큰 없애고, 인증 여부를 Failed로 한다.
      dispatch(DELETE_TOKEN());
      // LogOutAPI(accessToken);

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
        // console.log(response);

        if (response) {
          setRefreshToken(response.refresh_token);
          dispatch(SET_TOKEN(response.access_token));
          dispatch(SET_USERID(response.user_id));
          dispatch(SET_USEREMAIL(response.user_email));
          // console.log(response);
          console.log('리프레쉬 성공');
          setIsAuth('Success');
        } else {
          dispatch(DELETE_TOKEN());
          removeCookieToken();
          // 로그아웃 요청
          setIsAuth('Failed');
          console.log('리프레쉬 실패');
          alert('로그아웃 되셨습니다.');
          // return navigate('/');
        }
      }
    }
  };

  useEffect(() => {
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

async function requestToken(
  refreshToken: string,
): Promise<TokenType | false | undefined> {
  console.log('useState 시도해보기!!!');

  console.log('리프레쉬 요청 보내보기');

  try {
    return await axios({
      // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
      url: 'https://i8e208.p.ssafy.io/api/refresh',
      // 결제 준비 API는 POST 메소드라고 한다.
      method: 'get',
      headers: {
        // 카카오 developers에 등록한 admin키를 헤더에 줘야 한다.
        refreshToken: refreshToken,
      },
    }).then((res) => {
      console.log('리프레쉬 요청한 거 받음');
      // console.log(res);

      const tokens: TokenType = {
        access_token: res.data.accessToken,
        refresh_token: res.data.refreshToken,
        user_email: res.data.email,
        user_id: res.data.userSeq,
      };
      // console.log(tokens);
      console.log('토큰 오브젝트 보냅니다. 페이지야 받아라');
      return tokens;
    });
  } catch (err) {
    // console.log(err);
    console.log('Errrrrrr');
    return false;
  }
}
