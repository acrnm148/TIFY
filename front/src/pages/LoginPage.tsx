import '../css/login.styles.css';
import iconGoogle from '../assets/iconGoogle.svg';
import iconKakaoLogo from '../assets/iconKakaoLogo.svg';
import iconNaverLogo from '../assets/iconnaverLogo.png';

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { Login } from '../components/Auth';
import React, { useState } from 'react';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';
import { useSelector } from 'react-redux';
import { LogOut } from '../components/LogOut';
import { SignOut } from '../components/SignOut';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userid, setUserid] = useState('octover1025@naver.com');
  const [password, setPassword] = useState('123');

  const onValid = () => {
    setPassword('');
    Login(userid, password)
      .then((response) => {
        setRefreshToken(response.refresh_token);
        dispatch(SET_TOKEN(response.access_token));

        console.log('로그인 성공!!');
        return navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const onValid = async () => {
  //   setPassword('');
  //   await Login(userid, password)
  //     .then(() => {
  //       // console.log(res);
  //       // setRefreshToken(res.refresh_token);
  //       // dispatch(SET_TOKEN(res.access_token));
  //       console.log('로그인 성공!!');
  //       return navigate('/');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // function SubmitLogin() {
  //   Login(userid, password);
  // }

  return (
    <div className="grayBackground">
      <div className="login-inside-box">
        <p className="title">LOGIN to TIFY</p>
        <div className="loginBox">
          <div className="emailBox">
            <p>이메일</p>
            <form className="emailForm">
              <input
                type="text"
                className="inputBox"
                id="emailForm"
                placeholder="name@example.com"
                onChange={(e) => setUserid(e.target.value)}
              />
            </form>
            <p>비밀번호</p>
            <form>
              <input
                type="text"
                className="inputBox"
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
            <label>
              <input type="checkbox" name="color" value="blue" /> 로그인 정보
              저장
            </label>
            <button
              type="submit"
              className="loginButton font-roboto font-bold"
              onClick={onValid}
            >
              Login
            </button>
            <button className="findPassword font-bold">Forgot password?</button>
          </div>
        </div>
      </div>
      <LogOut />
      <SignOut />
      <div>
        <div className="cross-line-box">
          <div className="cross-line"></div>
          <span
            style={{
              margin: '10px',
              color: '#A1A3A2',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            OR
          </span>
          <div className="cross-line"></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="icon-box">
            <a href="https://kauth.kakao.com/oauth/authorize?client_id=097d883a03c0da953d919d990701da5f&redirect_uri=https://i8e208.p.ssafy.io/login/oauth2/code/kakao&response_type=code">
              <img src={iconKakaoLogo} />
            </a>
            <a
              href="https://nid.naver.com/oauth2.0/authorize?client_id=n4ayopJ7b7D_4KefcRcb&redirect_uri=https://i8e208.p.ssafy.io/login/oauth2/code/naver&response_type=code"
              style={{ height: '75px', width: '75px' }}
            >
              <img src={iconNaverLogo} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
