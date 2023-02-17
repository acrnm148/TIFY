import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/Auth';

import axios from 'axios';

import { getCookieToken, removeCookieToken } from './RefreshtokenLocal';
import { DELETE_TOKEN } from '../../store/Auth';
// import { logoutUser } from '../api/Users';

export function LogOut() {
  // store에 저장된 Access Token 정보를 받아 온다
  // console.log('로그아웃!!!');

  const accessToken = useSelector(
    (state: RootState) => state.authToken.accessToken,
  );
  function LogOutAPI(accessToken: string) {
    axios({
      url: 'https://i8e208.p.ssafy.io/api/account/logout',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
    })
      .then(() => {
        console.log('로그아웃 성공');
        // 로컬 쿠키 삭제.
        // localStorage.removeItem('roles');
        // localStorage.removeItem('firebase:host:tify-noti-default-rtdb.firebaseio.com');
      })
      .catch((err) => {
        console.log('로그아웃 실패', err);
      });
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cookie에 저장된 Refresh Token 정보를 받아 온다
  // const refreshToken = getCookieToken();

  function handleLogout() {
    // store에 저장된 Access Token 정보를 삭제
    dispatch(DELETE_TOKEN());
    // Cookie에 저장된 Refresh Token 정보를 삭제
    removeCookieToken();
    LogOutAPI(accessToken);

    return navigate('/');
  }

  return (
    // <>
    //   <Link to="/" />
    // </>

    <button onClick={handleLogout}>로그아웃</button>
  );
}

export default LogOut;
