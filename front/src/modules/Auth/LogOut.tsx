import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';

import { getCookieToken, removeCookieToken } from './Cookie';
import { DELETE_TOKEN } from '../../store/Auth';
// import { logoutUser } from '../api/Users';

export function LogOut() {
  // store에 저장된 Access Token 정보를 받아 온다
  // console.log('로그아웃!!!');

  // let accessToken = useSelector((state) => {
  //   return state.authToken.accessToken;
  // });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cookie에 저장된 Refresh Token 정보를 받아 온다
  // const refreshToken = getCookieToken();

  function handleLogout() {
    // store에 저장된 Access Token 정보를 삭제
    dispatch(DELETE_TOKEN());
    // Cookie에 저장된 Refresh Token 정보를 삭제
    removeCookieToken();
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
