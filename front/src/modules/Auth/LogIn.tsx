import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// interface ResState {
//   id: number;
//   userid: string;
//   accessToken: string;
//   refreshToken: string;
// }

type TokenType = {
  access_token: string;
  refresh_token: string;
  user_email: string;
  user_id: number;
  user_roles: string;
};

export async function Login(id: string, password: string) {
  try {
    return await axios 
      .post('https://i8e208.p.ssafy.io/api/account/login', { //http://localhost:8081/api/account/login
        userid: id,
        password,
      })
      .then((res) => {
        console.log(res);
        if (res.data === '로그인에 실패했습니다.') {
          return '로그인 실패!';
        } else {
          console.log(res.data.accessToken);
          const tokens: TokenType = {
            access_token: res.data.accessToken,
            refresh_token: res.data.refreshToken,
            user_email: res.data.email,
            user_id: res.data.userSeq,
            user_roles: res.data.roles
          };
          console.log(tokens);
          console.log('토큰 오브젝트 보냅니다. 페이지야 받아라');
          return tokens;
        }
      });
  } catch (err) {
    console.log(err);
    console.log('Errrrrrr');
    return Promise.reject(err);
  }

  // if (id === 'russ' && password === 'whynot0') {
  //   return {
  //     access_token: 'jx84e3kjew1njej3al2q9w',
  //     refresh_token: 'g2rjfd7452bjfgn;a&*(jkehj',
  //   };
  // } else {
  //   return undefined;
  // }
}
