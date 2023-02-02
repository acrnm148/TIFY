import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';

export function AuthNaver() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('location >>>', window.location.search);
  const params = new URLSearchParams(location.search);
  let code: any = params.get('code');
  console.log("params.get('code') >>> ", code);

  async function NaverLogin(code: string) {
    console.log('try naver login');
    axios({
      // 프록시에 카카오 도메인을 설정했으므로 결제 준비 url만 주자
      url: 'https://i8e208.p.ssafy.io/api/account/auth/login/naver',
      // 결제 준비 API는 POST 메소드라고 한다.
      method: 'GET',
      params: { code },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data.accessToken);
        console.log(res.data.refreshToken);
        setRefreshToken(res.data.accessToken);
        dispatch(SET_TOKEN(res.data.refreshToken));
        console.log('로그인 성공!!');
        return navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // NaverLogin(code);

  useEffect(() => {
    console.log('유즈 이팩트!');
    NaverLogin(code);
  }, []);
  return <div>hello naver</div>;
}
